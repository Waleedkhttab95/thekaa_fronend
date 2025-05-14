import { Button } from "./button";

const DashboardRoundedStats = ({ stats }: { stats: number | undefined }) => {
  return (
    <Button className="flex items-center justify-center w-10 h-10 sm:w-16 sm:h-16 md:w-10 md:h-10 lg:w-14 lg:h-14 text-base leading-[0]">
      {stats ? stats : stats === 0 ? stats : "N/A"}
    </Button>
  );
};
export default DashboardRoundedStats;
