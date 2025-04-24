import { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "./card";

const DashboardCard = ({
  children,
  cardTitle,
}: {
  children: ReactNode;
  cardTitle: string;
}) => {
  return (
    <div className="w-full max-w-[80%] md:max-w-[280px] xl:max-w-[30%]  aspect-[65/32] cursor-pointer hover:opacity-70 overflow-hidden">
      <Card className="h-full bg-white/60 shadow flex flex-col justify-center md:justify-evenly">
        <CardHeader className="flex items-center justify-center text-xl sm:text-3xl md:text-sm xl:text-lg font-bold text-center">
          <p>{cardTitle}</p>
        </CardHeader>
        <CardContent className="">{children}</CardContent>
      </Card>
    </div>
  );
};
export default DashboardCard;
