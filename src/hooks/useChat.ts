"use client";

import { useState, useCallback, useEffect } from "react";
import { Message, ChatResponse } from "@/types/chat";
import { v4 as uuidv4 } from "uuid";

const DOMAIN = "https://miuye.shibaura-it.ac";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatId, setChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // チャットセッションの開始
  const startChat = useCallback(async () => {
    try {
      const response = await fetch(`${DOMAIN}/start_chat`, {
        method: "POST",
      });
      const data = await response.json();
      setChatId(data.chat_id);
    } catch (error) {
      console.error("Failed to start chat:", error);
    }
  }, []);

  // メッセージの送信
  const sendMessage = useCallback(
    async (content: string) => {
      if (!chatId || !content.trim()) return;

      const messageId = uuidv4();
      // ユーザーメッセージを追加
      const userMessage: Message = {
        id: messageId,
        content,
        isUser: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const response = await fetch(`${DOMAIN}/chat/${chatId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        });

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No reader available");

        let currentResponse = "";
        let assistantMessageId = uuidv4();

        // SSEからの応答を処理
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = new TextDecoder().decode(value);
          const lines = chunk.split("\n").filter((line) => line.trim());

          for (const line of lines) {
            try {
              const data: ChatResponse = JSON.parse(line);

              if (data.status === "finished") {
                setIsLoading(false);
                break;
              }

              if (data.content) {
                currentResponse += data.content;
                setMessages((prev) => {
                  const existing = prev.find(
                    (m) => m.id === assistantMessageId
                  );
                  if (existing) {
                    return prev.map((m) =>
                      m.id === assistantMessageId
                        ? { ...m, content: currentResponse }
                        : m
                    );
                  } else {
                    return [
                      ...prev,
                      {
                        id: assistantMessageId,
                        content: currentResponse,
                        isUser: false,
                        timestamp: new Date(),
                      },
                    ];
                  }
                });
              }
            } catch (e) {
              console.error("Failed to parse SSE message:", e);
            }
          }
        }
      } catch (error) {
        console.error("Failed to send message:", error);
        setIsLoading(false);
      }
    },
    [chatId]
  );

  // 初期化時にチャットセッションを開始
  useEffect(() => {
    startChat();
  }, [startChat]);

  return {
    messages,
    sendMessage,
    isLoading,
  };
}
