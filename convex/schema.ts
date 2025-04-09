import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        image: v.optional(v.string()),
        role: v.union(v.literal("candidate"), v.literal("interviewer")),
        clerkId: v.string()
    }).index("by_clerk_id", ["clerkId"]),

    webhook_events: defineTable({
        eventId: v.string(),
        createdAt: v.optional(v.number()), // Optional timestamp if needed
    }).index("by_event_id", ["eventId"]), // Index for quick lookup

    interviews: defineTable({
        title: v.string(),
        description: v.optional(v.string()),
        startTime: v.number(),
        endTime: v.optional(v.number()),
        status: v.string(),
        streamCallId: v.string(),
        candidateId: v.string(),
        interviewerIds: v.array(v.string())
    })
    .index("by_candidate_id", ["candidateId"])
    .index("by_stream_call_id", ["streamCallId"]),

    comments: defineTable({
        content: v.string(),
        rating: v.number(),
        interviewerId: v.string(),
        interviewId: v.id("interviews")
    }).index("by_interview_id", ["interviewId"]),


});
