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
    <div className="w-full min-w-[325px] min-[1039px]:max-w-[375px]">
      <Card className="h-48 bg-white/60 shadow">
        <CardHeader className="flex items-center justify-center text-2xl font-bold text-center">
          {cardTitle}
        </CardHeader>
        <CardContent className="">{children}</CardContent>
      </Card>
    </div>
  );
};
export default DashboardCard;
