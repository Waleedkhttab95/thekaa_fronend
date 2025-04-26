import { ReactNode } from "react";
import { Card } from "./card";

// todo: add the backgorund image, conditinally render it right and left
// todo: add arrow button and conditinally render it
// todo: use Card Content if needed?? or just stickti Card maybe

const DashboardCard = ({
  children,
  variant,
}: {
  children: ReactNode;
  variant: "blue" | "pink";
}) => {
  return <Card variant={variant}>{children}</Card>;
};
export default DashboardCard;
