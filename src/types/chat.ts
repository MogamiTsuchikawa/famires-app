export type Message = {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
};

export type ChatResponse = {
  content?: string;
  status?: "finished";
};
