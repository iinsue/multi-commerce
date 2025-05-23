import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";

export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: "user_123" };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;

// 매번 OOOORouter를 만들때 마다 getPayload를 추가해야 하므로
// middleware에 추가하는 것 처럼 초기 설정에 포함시켜 코드 반복제거
export const baseProcedure = t.procedure.use(async ({ next }) => {
  const payload = await getPayload({ config });
  return next({ ctx: { db: payload } });
});
