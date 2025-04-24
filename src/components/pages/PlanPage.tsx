import { useTranslations } from "next-intl";
import DashboardCard from "../molecules/DashboardCard";
import { Button } from "../atoms/button";
import { Card, CardContent, CardHeader } from "../molecules/card";
import Image from "next/image";
import ProgressBar from "../atoms/progressBar";
import DashboardRoundedStats from "../atoms/dashboard-rouneded-stats";

const PlanPage = () => {
  const t = useTranslations("planPage");

  return (
    <div className="">
      <p className="text-2xl font-bold">{t("plan")}</p>
      <div className="bg-[url('/student-profile-bg.png')] rounded-[90px] md:rounded-[40px] bg-cover min-h-[744px] mt-10 py-12 px-2 flex flex-col items-center">
        <div className="flex flex-wrap gap-y-8 gap-x-5 xl:gap-x-8 justify-center items-center">
          <DashboardCard cardTitle={t("numberOfLessons")}>
            <DashboardRoundedStats stats={3} />
          </DashboardCard>
          <DashboardCard cardTitle={t("passedLessons")}>
            <DashboardRoundedStats stats={11} />
          </DashboardCard>
          <DashboardCard cardTitle={t("lessonsNeedComplete")}>
            <DashboardRoundedStats stats={3} />
          </DashboardCard>
          <DashboardCard cardTitle={t("level")}>
            <Button className="bg-green-500 text-2xl px-7 hover:bg-green-500">
              {t("levels.advanced")}
            </Button>
          </DashboardCard>
          <DashboardCard cardTitle={t("performance")}>
            <Button className="bg-[#FFA500] text-xl w-72 flex justify-between px-6 hover:bg-[#FFA500]">
              <span>100/80</span> <span>|</span>{" "}
              <span>{t("performanceLevels.veryGood")}</span>
            </Button>
          </DashboardCard>
          <DashboardCard cardTitle={t("progressPercentage")}>
            <div className="flex flex-col gap-2 w-full">
              <span className="text-xl font-semibold text-center">80%</span>
              <ProgressBar percentage={80} />
            </div>
          </DashboardCard>
        </div>
        <Card
          className="h-48 bg-white/60 shadow mt-7 
          min-w-[80%] max-w-[80%] sm:min-w-[calc(280px*2+20px)] min-[1075px]:min-w-[calc(280px*3+40px)] xl:min-w-[calc(90%+2*32px)]"
        >
          <CardHeader className="flex items-center justify-center text-2xl font-bold">
            {t("startYourNextLesson")}
          </CardHeader>
          <CardContent>
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
