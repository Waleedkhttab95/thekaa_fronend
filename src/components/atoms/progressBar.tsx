import { cn } from "@/lib/utils";

type ProgressBarProps = {
  percentage: number;
  className?: string;
};

const ProgressBar = ({ percentage, className }: ProgressBarProps) => {
  return (
    <div
      className={cn(
        "w-full h-3 bg-white rounded-full overflow-hidden border border-gray-300",
        className
      )}
    >
      <div
        className={`h-full bg-[#F7AEF3] rounded-[40px]`}
        style={{
          animation: `progressBarAnimation 0.5s ease-out forwards`,
          ["--target-width" as string]: `${percentage}%`,
        }}
      />
    </div>
  );
};

export default ProgressBar;
