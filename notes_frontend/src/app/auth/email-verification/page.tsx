"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PostService } from "../../../components/lib/PostService";
import SuccessVerification from "./components/SuccessVerification";
import FailureVerification from "./components/FailureVerification";

export default function MailVerificationPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    let isMounted = true;

    const runVerification = async () => {
      try {
        const result = await PostService(
          token,
          "email-confirmation/v1/verification",
        );

        if (!isMounted) return;

        if (result.ok) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (error) {
        if (!isMounted) return;
        setStatus("error");
      }
    };
    runVerification();

    return () => {
      isMounted = false;
    };
  }, [token]);

  return (
    <>
      <div>
        <div className=" w-full h-screen flex items-center justify-center  ">
          {status === "loading" && (
            <div className="w-6 h-6 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          )}
          <div className="w-2/5 h-2/5 bg-amber-150 flex items-center justify-center  border border-amber-600 rounded-3xl">
            {status === "success" && <SuccessVerification />}
            {status === "error" && <FailureVerification />}
          </div>
        </div>
      </div>
    </>
  );
}
