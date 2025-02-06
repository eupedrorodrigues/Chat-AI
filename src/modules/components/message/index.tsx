"use client";

import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

import { formatText } from "@/utils/format";

interface MessageProps {
  role: string;
  text: string;
}

const MessageAi = ({ role, text }: MessageProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (text) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [text]);

  return (
    <div
      className={`flex gap-3 text-sm ${role === "user" ? "w-max ml-auto" : ""}`}
    >
      {role !== "user" && (
        <>
          <Avatar>
            <AvatarFallback>{role === "user" ? "U" : "AI"}</AvatarFallback>
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <div className="max-w-[300px]">
            {loading ? (
              <div className="flex items-center space-x-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ) : (
              <p
                className="mt-2 w-full text-justify bg-gray-400 p-3 rounded-lg break-words"
                dangerouslySetInnerHTML={{
                  __html: formatText(text),
                }}
              />
            )}
          </div>
        </>
      )}

      {role === "user" && (
        <>
          <div className="max-w-[300px]">
            <p className="w-full text-justify bg-gray-200 p-3 rounded-lg whitespace-pre-line break-words">
              {text}
            </p>
          </div>
          <Avatar>
            <AvatarFallback>{role === "user" ? "U" : "AI"}</AvatarFallback>
            <AvatarImage src="https://avatars.githubusercontent.com/u/145250554?v=4" />
          </Avatar>
        </>
      )}
    </div>
  );
};

export default MessageAi;
