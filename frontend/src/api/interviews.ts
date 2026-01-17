import axios from "axios";
import type {
  Interview,
  CreateInterviewDto,
  Message,
  CreateMessageDto,
} from "@/types/index.ts";

// 配置 axios 基础URL
const API_BASE_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 获取所有面试
export const getAllInterviews = async (): Promise<Interview[]> => {
  const response = await api.get("/interviews");
  return response.data;
};

// 获取单个面试详情
export const getInterviewById = async (id: number): Promise<Interview> => {
  const response = await api.get(`/interviews/${id}`);
  return response.data;
};

// 创建新面试
export const createInterview = async (
  data: CreateInterviewDto,
): Promise<Interview> => {
  const response = await api.post("/interviews/create", data);
  return response.data;
};

// 更新面试
export const updateInterview = async (
  id: number,
  data: Partial<Interview>,
): Promise<Interview> => {
  const response = await api.patch(`/interviews/${id}`, data);
  return response.data;
};

// 删除面试
export const deleteInterviews = async (ids: number[]): Promise<any> => {
  const response = await api.delete(`/interviews/${ids[0]}`, { data: ids });
  return response.data;
};

// 发送消息（对话）
export const sendMessage = async (
  interviewId: number,
  content: string,
): Promise<Message> => {
  const response = await api.post(`/interviews/${interviewId}/chat`, {
    content,
  });
  return response.data;
};

// 获取所有消息
export const getAllMessages = async (): Promise<{
  list: Message[];
  total: number;
}> => {
  const response = await api.get("/messages");
  return response.data.data;
};

// 创建消息
export const createMessage = async (
  data: CreateMessageDto,
): Promise<Message> => {
  const response = await api.post("/messages", data);
  return response.data;
};

export default api;
