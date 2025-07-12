export interface ILessonData {
  _id: string;
  name: string;
  description: string;
  videoUrl: string;
  videoDuration: number;
  subject: {
    _id: string;
    name: string;
  };
}
