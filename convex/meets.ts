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
