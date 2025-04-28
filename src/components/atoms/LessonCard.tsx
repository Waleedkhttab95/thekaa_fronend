"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2, ease: "easeOut" }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0px 6px 20px rgba(0,0,0,0.08)",
        transition: { type: "spring", stiffness: 250, damping: 15 },
      }}
      className={cn(
        "flex items-center text-xs sm:text-base bg-white/60 w-[250px] sm:w-full h-[50px] font-bold border border-white rounded-[40px] ps-8 text-[#6C6063] cursor-pointer z-20",
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
    </motion.div>
  );
};

export default LessonCard;
