"use client";

import { useCallback, useEffect } from "react";
import { LoaderIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

const Page = () => {
  const trpc = useTRPC();
  const { mutate: verify } = useMutation(
    trpc.checkout.verify.mutationOptions({
      onSuccess: (data) => {
        window.location.href = data.url;
      },
      onError: () => {
        window.location.href = "/";
      },
    })
  );

  // useCallback으로 verify 함수를 안정화시키기기
  const verifyCallback = useCallback(() => {
    verify();
  }, [verify]);

  useEffect(() => {
    verifyCallback();
  }, [verifyCallback]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoaderIcon className="animate-spin text-muted-foreground" />
    </div>
  );
};

export default Page;
