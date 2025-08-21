export interface ILessonData {
  mergedContent: string;
  description: string;
  subject: string;
  lesson: {
    _id: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    name: string;
    description: string;
    subject: string;
    lessonCode: string;
    videoUrl: string;
    videoDuration: number;
    videoThumbnail: string;
    videoId: string;
    videoStatus: string;
    lessonQuestions: Array<{
      paragraphId: string;
      multiple_choice_questions: Array<{
        id: string;
        text: string;
        options: {
          A: string;
          B: string;
          C: string;
          D: string;
        };
        correct_answer: string;
        explanation: string;
      }>;
      true_false_questions: Array<any>;
    }>;
  };
  
  // Legacy properties for backward compatibility (optional)
  _id?: string;
  name?: string;
  videoUrl?: string;
  videoDuration?: number;
  currentLessonId?: string;
}
