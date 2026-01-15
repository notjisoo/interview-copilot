import type { Message } from "../types";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  console.log(message);
  return <div>MessageBubble</div>;
}
