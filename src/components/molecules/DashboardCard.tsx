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
    <Card className="min-w-[375px] max-w-[375px] h-48 bg-white/60 shadow">
      <CardHeader className="flex items-center justify-center text-2xl font-bold text-center">
        {cardTitle}
      </CardHeader>
      <CardContent className="">{children}</CardContent>
    </Card>
  );
};
export default DashboardCard;
