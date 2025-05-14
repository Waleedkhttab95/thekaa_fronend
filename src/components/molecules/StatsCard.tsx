import Image from "next/image";
import { Button } from "../atoms/button";
import { LevelLabels } from "@/types/content.type";
import { useTranslations } from "next-intl";

const levelColors = {
  [LevelLabels.EXPERT]: "bg-green-600",
  [LevelLabels.ADVANCED]: "bg-emerald-500",
  [LevelLabels.INTERMEDIATE]: "bg-yellow-400",
  [LevelLabels.BEGINNER]: "bg-orange-400",
  [LevelLabels.NOVICE]: "bg-red-400",
};

const StatsCard = ({
  level,
  text,
  svgPath,
  alt,
}: {
  level?: LevelLabels;
  text?: string | React.ReactNode;
  svgPath?: string;
  alt?: string;
}) => {
  const t = useTranslations("planPage.levels");
  const colorClass = level ? levelColors[level] : "bg-gray-300";

  return (
    <Button
      className={`${colorClass} text-lg md:text-xl xl:text-2xl px-7 hover:${colorClass} max-w-full h-8 sm:h-auto`}
    >
      {text ?? (level ? t(level) : "N/A")}
      {svgPath && alt && (
        <Image src={svgPath} alt={alt} width={40} height={40} />
      )}
    </Button>
  );
};
export default StatsCard;
