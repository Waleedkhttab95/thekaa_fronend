import { cn } from "@/lib/utils";

const LessonCard = ({
  lesson,
  date,
  firstLesson,
}: {
  lesson: string;
  date: string;
  firstLesson?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex items-center bg-white/60 w-full h-[50px] font-bold border border-white rounded-[40px] ps-8 text-[#6C6063] cursor-pointer z-20",
        firstLesson && "text-black"
      )}
    >
      <p className="w-[80px] text-center">{date}</p>
      <span
        className={cn(
          "w-[1px] h-6 bg-[#6C6063] mx-4",
          firstLesson && "bg-black"
        )}
      ></span>
      <p className="flex-1">{lesson}</p>
    </div>
  );
};
export default LessonCard;
