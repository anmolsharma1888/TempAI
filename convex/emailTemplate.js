import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const SaveTemplate = mutation({
    args: {
        tid: v.string(),
        design: v.any(),
        email:v.string()
    },
    handler: async (convexToJson, args) => {
        try {
            const result = await convexToJson.db.insert('emailTemplates', {
                tid: args.tid,
                design: args.design,
                email:args.email
            })
            return result;
        }
        catch (e) {

        }
    }
})