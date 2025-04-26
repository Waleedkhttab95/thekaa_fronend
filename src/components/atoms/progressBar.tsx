type ProgressBarProps = {
  percentage: number;
};

const ProgressBar = ({ percentage }: ProgressBarProps) => {
  return (
    <div className="w-full h-3 bg-white rounded-full overflow-hidden">
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
