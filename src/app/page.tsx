"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Globe } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Send } from "lucide-react";

import { chat } from "@/api/index";

interface Message {
  role: string;
  text: string;
}

const HomePage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const formatText = (text: string) => {
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    formattedText = formattedText.replace(/\*(.*?)\*/g, "<li>$1</li>");
    formattedText = formattedText.replace(/\n/g, "<br />");
    return formattedText;
  };

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

  return (
    <div className="flex flex-col border-red-500 min-h-screen bg-slate-50 items-center justify-center">
      <Card className="w-[440px] h-[700px] grid grid-rows-[min-content_1fr_min-content]">
        <CardHeader>
          <CardTitle>Chat AI</CardTitle>
          <CardDescription>Using Google Generative AI</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 text-sm ${
                msg.role === "user" ? "w-max ml-auto" : ""
              }`}
            >
              {msg.role !== "user" && (
                <>
                  <Avatar>
                    <AvatarFallback>
                      {msg.role === "user" ? "U" : "AI"}
                    </AvatarFallback>
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <p
                    className="mt-2 w-full text-justify bg-gray-200 p-3 rounded-lg break-words"
                    dangerouslySetInnerHTML={{
                      __html:
                        typeof msg.text === "string" && msg.text.trim() !== ""
                          ? formatText(msg.text)
                          : "No response from AI",
                    }}
                  />
                </>
              )}

              {msg.role === "user" && (
                <>
                  <p
                    className="w-4/5 bg-gray-200 text-justify p-2 rounded-lg break-word"
                    dangerouslySetInnerHTML={{
                      __html:
                        typeof msg.text === "string" && msg.text.trim() !== ""
                          ? formatText(msg.text)
                          : "No response from AI",
                    }}
                  />
                  <Avatar>
                    <AvatarFallback>
                      {msg.role === "user" ? "U" : "AI"}
                    </AvatarFallback>
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                </>
              )}
            </div>
          ))}
        </CardContent>
        <CardFooter className="space-x-5 pt-3">
          <Textarea
            placeholder="How can I help you"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            rows={4}
            className="h-3 min-h-11 overflow-hidden resize-none border pt-[10px] border-gray-300 rounded-lg"
          />
          <Button type="submit" onClick={handleSendMessage} disabled={loading}>
            <Send />
          </Button>
        </CardFooter>
      </Card>
      <nav className="border-red-700">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-muted-foreground flex h-9 w-full items-center justify-start rounded-lg px-4 transition-colors hover:bg-transparent md:h-8"
                onClick={() => setIsOpen(!isOpen)}
              >
                <div>
                  <Globe />
                  <span className="ml-4 font-medium">language</span>
                </div>
                {isOpen ? (
                  <ChevronUp className="h-10 w-10" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">language</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </div>
  );
};

export default HomePage;
