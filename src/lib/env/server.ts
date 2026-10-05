import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    PAYSTACK_SECRET_KEY: z.string().min(1),
  },
  createFinalSchema: (env) => {
    return z.object(env).transform((val) => {
      const { PAYSTACK_SECRET_KEY, ...rest } = val;

      return {
        ...rest,
        AUTHORIZATION_HEADER: `Bearer ${PAYSTACK_SECRET_KEY}`,
      };
    });
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: process.env,
});
