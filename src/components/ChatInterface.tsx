"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mic, Send } from "lucide-react";
import { useState, useCallback, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { useChat } from "@/hooks/useChat";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { Item } from "@/types/item";
import { ItemCard } from "@/components/ItemCard";
import { items } from "@/data/item";

export function ChatInterface({
  setSelectedItem,
}: {
  setSelectedItem: (item: Item) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const { messages, sendMessage, isLoading } = useChat();
  const { isListening, startListening, stopListening, isSupported } =
    useSpeechRecognition();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = useCallback(async () => {
    if (inputMessage.trim() && !isLoading) {
      const message = inputMessage;
      setInputMessage("");
      await sendMessage(message);
    }
  }, [inputMessage, isLoading, sendMessage]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        handleSend();
      }
    },
    [handleSend]
  );

  const handleMicClick = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening((text) => {
        setInputMessage((prev) => prev + text);
      });
    }
  }, [isListening, startListening, stopListening]);

  const extractItemIds = (text: string): string[] => {
    const matches = text.match(/\[(.*?)\]/g);
    return matches ? matches.map((match) => match.slice(1, -1)) : [];
  };

  const findItemsByIds = (ids: string[]): Item[] => {
    return items.filter((item) => ids.includes(item.id));
  };

  const removeItemTags = (text: string): string => {
    return text.replace(/\[(.*?)\]/g, "").trim();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="lg"
          className="relative rounded-full h-14 w-14 bg-blue-500 hover:bg-blue-600 shadow-lg flex items-center justify-center"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader>
          <SheetTitle>チャットサポート</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {messages.map((message) => (
            <div key={message.id}>
              <div
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                } mb-4`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.isUser
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {message.isUser
                    ? message.content
                    : removeItemTags(message.content)}
                </div>
              </div>
              {!message.isUser && (
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {findItemsByIds(extractItemIds(message.content)).map(
                    (item) => (
                      <div key={item.id} className="scale-90 origin-left">
                        <ItemCard
                          item={item}
                          onClick={(item) => {
                            setSelectedItem(item);
                            setIsOpen(false);
                          }}
                        />
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-100 text-gray-900 rounded-lg px-4 py-2">
                ・・・
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className={`shrink-0 ${
                isListening
                  ? "bg-red-500 hover:bg-red-600 text-white border-red-500"
                  : ""
              }`}
              onClick={handleMicClick}
              disabled={!isSupported || isLoading}
            >
              <Mic className={`h-4 w-4 ${isSupported ? "" : "opacity-50"}`} />
            </Button>
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={
                isSupported
                  ? "メッセージを入力..."
                  : "このブラウザは音声入力に対応していません"
              }
              className="flex-1"
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              size="icon"
              className="shrink-0"
              disabled={isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
