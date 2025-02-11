"use client";

import { useTranslations } from "next-intl";

import { Send } from "lucide-react";
import { ChatInputProps } from "@/types";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ChatInput = ({ value, onChange, onSend, loading }: ChatInputProps) => {
  const t = useTranslations();

  return (
    <div className="flex gap-2 w-full">
      <Textarea
        placeholder={t("How can I help you")}
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        rows={1}
        className="flex-1 min-h-[40px] overflow-hidden resize-none border pt-[10px] border-gray-300 rounded-lg"
      />
      <Button type="submit" onClick={onSend} disabled={loading}>
        <Send />
      </Button>
    </div>
  );
};

export default ChatInput;
