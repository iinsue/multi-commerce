import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.find({
      collection: "products",
      depth: 1, // Populate "category" & "image"
    });

    // Artificial delay for development/testing
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return data;
  }),
});
