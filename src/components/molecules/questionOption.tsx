import { cn } from "@/lib/utils";
import Image from "next/image";

interface QuestionOptionProps {
  id: string;
  text: string;
  imageUrl?: string;
  width?: number;
  hight?: number;
  isSelected: boolean;
  onSelect: (id: string) => void;
  className?: string;
  background?: "transparent" | "white" | string;
}

export function QuestionOption({
  id,
  text,
  imageUrl,
  width,
  hight,
  isSelected,
  onSelect,
  background = "transparent",
}: QuestionOptionProps) {
  return (
    <div
      onClick={() => !isSelected && onSelect(id)}
      className={cn(
        "flex w-full items-center gap-2 p-3 rounded-[40px] border cursor-pointer transition-colors mb-[24px] select-none",
        isSelected
          ? "border-[#23F6F0] bg-[#232525]/10 ring-1 ring-[#23F6F0] cursor-default bg-slate-100"
          : background === "white"
          ? "bg-white hover:bg-gray-100"
          : "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
      )}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={"img"}
          className={cn(
            "w-28 h-28 rounded-[20px] overflow-hidden relative cursor-pointer border-2 transition-all duration-900 ease-in-out",
            isSelected
              ? "border-[#23F6F0] shadow-lg"
              : "border-transparent cursor-default"
          )}
          width={width}
          height={hight}
        />
      ) : (
        <>
          <div
            className={cn(
              "w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold text-gray-700 text-center",
              isSelected
                ? "border-[#23F6F0] bg-[#23F6F0] scale-200"
                : background === "white"
                ? "bg-gray-100 border-gray-300"
                : "bg-transparent border-gray-300 cursor-default"
            )}
          >
            {id === "true" ? "✔️" : id === "false" ? "❌" : id}
          </div>

          <label
            className={cn(
              "w-full text-start cursor-pointer font-ibm",
              isSelected ? "cursor-default" : ""
            )}
          >
            {text}
          </label>
        </>
      )}
    </div>
  );
}
