import { ReactNode } from "react";
import { Card, CardContent } from "./card";

const DashboardInfoCard = ({
  children,
  cardTitle,
}: {
  children: ReactNode;
  cardTitle: string;
}) => {
  return (
    <div className="w-full max-w-[80%] md:max-w-[280px] xl:max-w-[30%]  aspect-[65/32] cursor-pointer hover:opacity-70 overflow-hidden">
      <Card className="h-full bg-white/60 shadow flex flex-col justify-center md:justify-evenly">
        <CardContent
          className="flex flex-col gap-y-1 sm:gap-y-4 items-center justify-center text-xl sm:text-3xl md:text-sm xl:text-lg 
        font-bold text-center py-4 sm:py-0"
        >
          <p className="pt-3">{cardTitle}</p>
          {children}
        </CardContent>
      </Card>
    </div>
  );
};
export default DashboardInfoCard;
