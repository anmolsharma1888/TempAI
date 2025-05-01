import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const SaveTemplate = mutation({
  args: {
    tid: v.string(),
    design: v.object({ result: v.array(v.any()) }),
    email: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert('emailTemplates', {
      tid: args.tid,
      design: args.design,
      email: args.email.toLowerCase(),
      description: args.description,
    });
    console.log('Saved template with tid:', args.tid, 'email:', args.email, 'design:', args.design, 'description:', args.description);
    return result;
  },
});

export const GetTemplateDesign = query({
  args: {
    email: v.string(),
    tid: v.string(),
  },
  handler: async (ctx, args) => {
    console.log('Querying with tid:', args.tid, 'email:', args.email);
    const result = await ctx.db
      .query('emailTemplates')
      .filter((q) => q.and(q.eq(q.field('tid'), args.tid), q.eq(q.field('email'), args.email.toLowerCase())))
      .collect();
    console.log('GetTemplateDesign exact match result:', result.map(r => ({ tid: r.tid, email: r.email, description: r.description, design: r.design })));

    if (result.length === 0 && process.env.NODE_ENV === 'development') {
      const allRecords = await ctx.db.query('emailTemplates').collect();
      console.log('All emailTemplates records:', allRecords);
    }

    return result.length > 0 ? result[0] : null;
  },
});

export const UpdateTemplateDesign = mutation({
  args: {
    tid: v.string(),
    email: v.string(), // Add email to args
    design: v.any(),
  },
  handler: async (ctx, args) => {
    // Query the existing template by tid and email
    const result = await ctx.db
      .query('emailTemplates')
      .filter((q) => q.and(q.eq(q.field('tid'), args.tid), q.eq(q.field('email'), args.email.toLowerCase())))
      .collect();

    // Check if a record exists
    if (!result || result.length === 0) {
      console.error('Template not found for tid:', args.tid, 'email:', args.email);
      throw new Error(`Template not found for tid: ${args.tid} and email: ${args.email}`);
    }

    const docId = result[0]._id;
    console.log('Updating template with docId:', docId);

    // Update the record
    await ctx.db.patch(docId, {
      design: args.design,
    });

    console.log('Updated template with tid:', args.tid, 'email:', args.email, 'design:', args.design);
  },
});

export const GetAllUserTemplate = query({
  args: {
    email: v.string()
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.query('emailTemplates')
      .filter(q => q.eq(q.field('email'), args.email.toLowerCase()))
      .collect();

    return result;
  }
})