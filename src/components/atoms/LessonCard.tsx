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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      className={cn(
        "flex items-center text-xs bg-white/60 w-[250px] sm:w-full h-[50px] font-bold border border-white rounded-[40px] ps-1 text-[#6C6063] cursor-pointer z-20",
        firstLesson && "text-black"
      )}
    >
      <p className="w-[100px] text-center">{date}</p>
      <span
        className={cn(
          "w-[1px] h-6 bg-[#6C6063] mx-4",
          firstLesson && "bg-black"
        )}
      ></span>
      <p className="flex-1 pe-2">{lesson}</p>
    </motion.div>
  );
};

export default LessonCard;
