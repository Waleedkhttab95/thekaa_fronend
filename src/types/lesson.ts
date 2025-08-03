export interface ILessonData {
  _id: string;
  name: string;
  description: string;
  videoUrl: string;
  videoDuration: number;
  currentLessonId: string;
  videoStatus?: string; // Status of the video processing (e.g., 'waiting', 'ready', 'processing')
  subject: {
    _id: string;
    name: string;
  };
}
