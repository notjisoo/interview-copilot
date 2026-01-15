export interface User {
  id: number;
  username: string;
  nickname: string;
  password: string;
}

export interface Message {
  id: number;
  interview_id: number;
  role: "user" | "assistant";
  content: string;
  created_at: string | Date;
}

export interface Interview {
  id: number;
  user_id: number;
  jd_text: string;
  status: "ongoing" | "completed";
  total_score: number;
  created_at: string | Date;
  user?: User;
  messages?: Message[];
}

export interface CreateInterviewDto {
  user_id: number;
  jd_text: string;
  status?: string;
  total_score?: number;
}

export interface CreateMessageDto {
  interview_id: number;
  role: "user" | "assistant";
  content: string;
}
