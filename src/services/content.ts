import { API_BASE_URL } from "@/config/env.constant";
import { axiosClient } from "@/lib/axios";
import { ISubject } from "@/types/content.type";
import { Locales } from "@/types/locales.enum";

const API_ROUTE = "content";

export const getSubjects = async (locale: Locales): Promise<ISubject[]> => {
  const { data } = await axiosClient.get(
    `/${API_ROUTE}/subjects?lang=${locale}`
  );
  return data;
};
export const getCountries = async (locale: Locales): Promise<ISubject[]> => {
  const { data } = await axiosClient.get(
    `/${API_ROUTE}/countries?lang=${locale}`
  );
  return data;
};
export const getGradeLevels = async (locale: Locales): Promise<ISubject[]> => {
  const { data } = await axiosClient.get(
    `/${API_ROUTE}/grade-levels?lang=${locale}`
  );
  return data;
};

export interface AiAssistantMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const getAiAssistantResponse = async (messages: AiAssistantMessage[]): Promise<string> => {
  const { data } = await axiosClient.post(`${API_BASE_URL}/education_content/ai_assistant`, {
    messages,
  });
  return data.response;
};
