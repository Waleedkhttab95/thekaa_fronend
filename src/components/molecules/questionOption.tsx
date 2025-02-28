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
}

export function QuestionOption({
  id,
  text,
  imageUrl,
  width,
  hight,
  isSelected,
  onSelect,
}: QuestionOptionProps) {
  return (
    <div
      onClick={() => onSelect(id)}
      className={cn(
        "flex w-full items-center gap-2 p-3 rounded-[40px] border cursor-pointer transition-colors mb-[24px]",
        isSelected
          ? "border-[#23F6F0] bg-[#23F6F0]/10 ring-1 ring-[#23F6F0]"
          : "hover:bg-gray-100 dark:hover:bg-gray-800"
      )}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={"img"}
          className={cn(
            "w-28 h-28 rounded-[20px] overflow-hidden relative cursor-pointer border-2 transition-all",
            isSelected ? "border-[#23F6F0] shadow-lg" : "border-transparent"
          )}
          width={width}
          height={hight}
        />
      ) : (
        <>
          <div
            className={cn(
              "w-6 h-6 rounded-full border bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-700",
              isSelected ? "border-[#23F6F0] bg-[#23F6F0]" : "border-gray-300"
            )}
          >
            {id}
          </div>

          <label className="w-full text-start cursor-pointer font-ibm">
            {text}
          </label>
        </>
      )}
    </div>
  );
}
