import Image from "next/image";
import { Button } from "../atoms/button";

const StatsCard = ({
  bgColor,
  text,
  svgPath,
  alt,
}: {
  bgColor: string;
  text: string | React.ReactNode;
  svgPath?: string;
  alt?: string;
}) => {
  return (
    <Button className={`${bgColor} text-lg md:text-xl xl:text-2xl px-7 hover:${bgColor} max-w-full h-8 sm:h-auto`}>
      {text}
      {svgPath && alt && (
        <Image src={svgPath} alt={alt} width={40} height={40} />
      )}
    </Button>
  );
};
export default StatsCard;
