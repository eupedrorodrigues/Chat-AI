"use client";

import { useTranslations } from "next-intl";

import { Send } from "lucide-react";
import { ChatInputProps } from "./types";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ChatInput = ({ value, onChange, onSend, loading }: ChatInputProps) => {
  const t = useTranslations();

  return (
    <>
      <Textarea
        placeholder={t("How can I help you")}
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        rows={4}
        className="h-3 min-h-11 overflow-hidden resize-none border pt-[10px] border-gray-300 rounded-lg"
      />
      <Button type="submit" onClick={onSend} disabled={loading}>
        <Send />
      </Button>
    </>
  );
};

export default ChatInput;
