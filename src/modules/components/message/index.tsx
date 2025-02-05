"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { formatText } from "@/utils/format";

interface MessageProps {
  role: string;
  text: string;
}

const MessageAi = ({ role, text }: MessageProps) => {
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
          <p
            className="mt-2 w-full text-justify bg-gray-200 p-3 rounded-lg break-words"
            dangerouslySetInnerHTML={{
              __html: formatText(text),
            }}
          />
        </>
      )}

      {role === "user" && (
        <>
          <p
            className="w-4/5 bg-gray-200 text-justify p-2 rounded-lg break-word"
            dangerouslySetInnerHTML={{
              __html: formatText(text),
            }}
          />
          <Avatar>
            <AvatarFallback>{role === "user" ? "U" : "AI"}</AvatarFallback>
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
        </>
      )}
    </div>
  );
};
export default MessageAi;
