import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const syncUser = mutation({
    args: {
        clerkId: v.string(),
        name: v.string(),
        email: v.string(),
        image: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        // Use an atomic transaction to prevent race conditions
        const existingUser = await ctx.db
            .query("users")
            .filter(q => q.eq(q.field("clerkId"), args.clerkId))
            .first();

        if (existingUser) {
            // Check if an update is needed
            if (existingUser.name !== args.name || existingUser.image !== args.image) {
                await ctx.db.patch(existingUser._id, {
                    name: args.name,
                    image: args.image
                });
                console.log(`✅ Updated user ${args.clerkId} with new name/image`);
            } else {
                console.log(`⚠️ No changes detected for user ${args.clerkId}, skipping update.`);
            }
            return;
        }

        // Insert new user, ensuring no duplicate insertion
        try {
            await ctx.db.insert("users", {
                ...args,
                role: "candidate",
            });
            console.log(`🚀 Inserted new user: ${args.clerkId}`);
        } catch (err) {
            console.error(`❌ Error inserting user ${args.clerkId}:`, err);
        }
    }
});

//queries
export const getUsers = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("User is not authenticated");
        }

        const users = await ctx.db.query("users").collect();

        if(!users){
            throw new Error("No users found");
        }

        return users;
    }
})

export const getUserByClerkId = query({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
        .first();

        return user;
    }
})