import { mutation } from './_generated/server';
import { v } from 'convex/values';
import { query } from './_generated/server';
import getUserId from '@/utils/getOrCreateuserId';

export const createMeet = mutation({
  args: {
    title: v.string(),
    userId: v.string(),
    description: v.string(),
    dateTime: v.string(),
    link: v.string(),
  },
  handler: async (ctx, args) => {
    const meetId = await ctx.db.insert('meets', {
      ...args,
      createdAt: Date.now(),
    });
    return meetId;
  },
});

export const getMeets = query({
  args: {},
  handler: async (ctx) => {
    const meets = await ctx.db.query('meets').order('desc').collect();
    return meets;
  },
});

export const deleteMeet = mutation({
  args: {
    meetId: v.id('meets'),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const { meetId, userId } = args;

    // First check if the meet exists
    const meet = await ctx.db.get(meetId);

    if (!meet) {
      throw new Error('Meet not found');
    }

    // Check if the userId matches the meet creator
    if (meet.userId !== userId) {
      throw new Error('Not authorized to delete this meet');
    }

    // Delete the meet
    await ctx.db.delete(meetId);

    return {
      success: true,
      message: 'Meet deleted successfully',
    };
  },
});

export const updateMeet = mutation({
  args: {
    meetId: v.id('meets'),
    userId: v.string(), // The ID of the user attempting the update
    updateData: v.object({
      title: v.optional(v.string()),
      description: v.optional(v.string()),
      dateTime: v.optional(v.string()), // Expect ISO string
      link: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const { meetId, userId, updateData } = args;

    // Fetch the meet from the database
    const meet = await ctx.db.get(meetId);

    if (!meet) {
      throw new Error('Meet not found');
    }

    // Check if the userId matches the meet creator
    if (meet.userId !== userId) {
      throw new Error('Not authorized to update this meet');
    }

    // Perform the update
    const updatedMeet = await ctx.db.patch(meetId, updateData);

    return {
      success: true,
      message: 'Meet updated successfully',
      updatedMeet, // Return the updated meet for client use
    };
  },
});
