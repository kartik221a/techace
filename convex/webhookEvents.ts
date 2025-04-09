import { mutation, query } from "./_generated/server";

export const getEvent = query(async ({ db }, { eventId }: { eventId: string }) => {
  return await db
    .query("webhook_events")
    .filter(q => q.eq(q.field("eventId"), eventId as string))
    .first();
});

export const storeEvent = mutation(async ({ db }, { eventId }: { eventId: string }) => {
  await db.insert("webhook_events", { eventId: eventId as string });
});
