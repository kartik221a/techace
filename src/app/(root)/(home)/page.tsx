/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { useState } from "react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/hooks/useUserRole";
import { QUICK_ACTIONS } from "@/constants";
import ActionCard from "@/components/ActionCard";
import MeetingModal from "@/components/MeetingModal";
import LoaderUI from "@/components/LoaderUI";

import { api } from "@/../convex/_generated/api";
import MeetingCard from "@/components/MeetingCard";
import { Loader2Icon } from "lucide-react";

// demo for subscription
import { PricingTable } from '@clerk/nextjs' // Import PricingTable from Clerk

export default function Home() {
  const router = useRouter();
  const { isInterviewer, isCandidate, isLoading } = useUserRole();
  const interviews = useQuery(api.interviews.getMyInterviews);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();

  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;
      case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;
      default:
        router.push(`/${title.toLowerCase()}`);
        break;
    }
  };

  if (isLoading) return <LoaderUI />;

  return (
    <div>
      <div className="container max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="rounded-lg bg-card p-6 border shadow-s mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">
            Welcome Back!
          </h1>

          <p className="text-muted-foreground mt-2">
            {isInterviewer
              ? "Manage your interviews and review candidates effectively"
              : "Access our upcoming interviews and preparations"}
          </p>
        </div>

        {isInterviewer ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {QUICK_ACTIONS.map((action) => (
                <ActionCard
                  key={action.title}
                  action={action}
                  onClick={() => handleQuickAction(action.title)}
                />
              ))}
            </div>

            <MeetingModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              title={modalType === "join" ? "Join Meeting" : "Start Meeting"}
              isJoinMeeting={modalType === "join"}
            />
          </>
        ) : (
          <>
            <div>
              <h1 className="text-3xl font-bold">Your Interviews</h1>
              <p className="text-muted-foreground mt-1">
                View and join your scheduled interviews
              </p>
            </div>

            <div className="mt-8">
              {interviews === undefined ? (
                <div className="flex justify-center py-12">
                  <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : interviews.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {interviews.map((interview) => (
                    <MeetingCard key={interview._id} interview={interview} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  You have no scheduled interviews
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <div>
        <PricingTable />
      </div>
    </div>
  );
}
