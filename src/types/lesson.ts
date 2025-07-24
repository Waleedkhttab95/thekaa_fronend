export interface ILessonData {
  _id: string;
  name: string;
  description: string;
  videoUrl: string;
  videoDuration: number;
  currentLessonId: string;
  subject: {
    _id: string;
    name: string;
  };
}
