import { ILessonData } from "@/types/lesson";
import { Locales } from "@/types/locales.enum";
import { AxiosInstance } from "axios";
const API_ROUTE = "/education_content";
export const getLesson = async (
  axiosAuth: AxiosInstance,
  studentId: string,
  locale: Locales
): Promise<ILessonData> => {
  const { data } = await axiosAuth.post(
    `${API_ROUTE}/create-lesson?lang=${locale}`,
    {
      studentId,
    }
  );
  return data;
};
