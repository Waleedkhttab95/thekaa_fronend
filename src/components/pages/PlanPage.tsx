import { useTranslations } from "next-intl";
import DashboardCard from "../molecules/DashboardCard";
import { Button } from "../atoms/button";
import { Card, CardContent, CardHeader } from "../molecules/card";
import Image from "next/image";

const PlanPage = () => {
  const t = useTranslations("planPage");

  return (
    <div>
      <p className="text-2xl font-bold">{t("plan")}</p>
      <div className="bg-[url('/student-profile-bg.png')] bg-cover rounded-[40px] min-h-[744px] mt-10 p-12">
        <div className="h-4/6 flex flex-wrap gap-x-5 justify-center">
          <DashboardCard cardTitle={t("numberOfLessons")}>
            <Button className="w-14 h-14">3</Button>
          </DashboardCard>
          <DashboardCard cardTitle={t("passedLessons")}>
            <Button className="w-14 h-14">11</Button>
          </DashboardCard>
          <DashboardCard cardTitle={t("lessonsNeedComplete")}>
            <Button className="w-14 h-14">3</Button>
          </DashboardCard>
          <DashboardCard cardTitle={t("level")}>
            <Button className="bg-green-500 text-2xl px-7 hover:bg-green-500/90">
              {t("levels.advanced")}
            </Button>
          </DashboardCard>
          <DashboardCard cardTitle={t("performance")}>
            <Button className="bg-orange-500 text-xl w-72 flex justify-between px-6">
              <span>100/80</span> <span>|</span>{" "}
              <span>{t("performanceLevels.veryGood")}</span>
            </Button>
          </DashboardCard>
          <DashboardCard cardTitle={t("progressPercentage")}>80%</DashboardCard>
        </div>
        <Card className="h-48 bg-white/60 shadow">
          <CardHeader className="flex items-center justify-center text-2xl font-bold">
            {t("startYourNextLesson")}
          </CardHeader>
          <CardContent className="">
            <Button>
              <Image src={"/arrow.svg"} alt="arrow" width={24} height={24} />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default PlanPage;
