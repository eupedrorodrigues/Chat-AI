"use client";

import { useState } from "react";
// import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import MessageAi from "@/modules/components/message";
import ChatInput from "@/modules/components/chat-input";
// import LanguageSwitcher from "../components/language-switch";

import { formatText } from "@/utils/format";
import { chat } from "@/api/index";

interface Message {
  role: string;
  text: string;
}

// const LANGUAGES = ["en", "pt-BR"];

const ChatPage = () => {
  const t = useTranslations();
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  // const pathname = usePathname();

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    setLoading(true);

    const newMessage: Message = { role: "user", text: inputValue };
    setMessages([...messages, newMessage]);
    setInputValue("");

    try {
      const result = await chat.sendMessage(inputValue);
      const response = await result.response;
      const text = response.text();

      setMessages([
        ...messages,
        newMessage,
        { role: "model", text: formatText(text) },
      ]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // const handleLanguage = (language: string) => {
  //   const pathSegments = pathname.split("/").filter(Boolean);
  //   if (pathSegments.length > 0 && LANGUAGES.includes(pathSegments[0])) {
  //     pathSegments[0] = language;
  //   } else {
  //     pathSegments.unshift(language);
  //   }
  //   return `/${pathSegments.join("/")}`;
  // };
  return (
    <div className="flex flex-col border-red-500 min-h-screen bg-slate-50 items-center justify-center">
      <Card className="w-[440px] h-[700px] grid grid-rows-[min-content_1fr_min-content]">
        <CardHeader>
          <CardTitle>Chat AI</CardTitle>
          <CardDescription>{t("Using Google Generative AI")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <MessageAi key={index} role={msg.role} text={msg.text} />
          ))}{" "}
        </CardContent>
        <CardFooter className="space-x-5 pt-3">
          <ChatInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onSend={handleSendMessage}
            loading={loading}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatPage;
