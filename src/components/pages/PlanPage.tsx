import { useLocale, useTranslations } from "next-intl";
import DashboardInfoCard from "../molecules/DashboardInfoCard";
import { Button } from "../atoms/button";
import { Card, CardContent, CardHeader } from "../molecules/card";
import Image from "next/image";
import ProgressBar from "../atoms/progressBar";
import DashboardRoundedStats from "../atoms/dashboard-rouneded-stats";
import StatsCard from "../molecules/StatsCard";
import { Locales } from "@/types/locales.enum";
import { cn } from "@/lib/utils";

const PlanPage = () => {
  const t = useTranslations("planPage");
  const locale = useLocale();

  return (
    <div>
      <p className="text-2xl font-bold">{t("plan")}</p>
      <div className="bg-[url('/student-profile-bg.png')] rounded-[90px] md:rounded-[40px] bg-cover min-h-[744px] mt-10 py-12 px-2 flex flex-col items-center">
        <div className="w-full flex flex-wrap gap-y-8 gap-x-5 xl:gap-x-8 justify-center items-center">
          <DashboardInfoCard cardTitle={t("numberOfLessons")}>
            <DashboardRoundedStats stats={3} />
          </DashboardInfoCard>
          <DashboardInfoCard cardTitle={t("passedLessons")}>
            <DashboardRoundedStats stats={11} />
          </DashboardInfoCard>
          <DashboardInfoCard cardTitle={t("lessonsNeedComplete")}>
            <DashboardRoundedStats stats={3} />
          </DashboardInfoCard>
          <DashboardInfoCard cardTitle={t("level")}>
            <StatsCard text={t("levels.advanced")} bgColor="bg-green-500" />
          </DashboardInfoCard>
          <DashboardInfoCard cardTitle={t("performance")}>
            <StatsCard
              text={
                <>
                  <span>100/80</span>
                  <span className="mx-3 xl:mx-8">|</span>
                  <span>{t("performanceLevels.veryGood")}</span>
                </>
              }
              bgColor="bg-[#FFA500]"
            />
          </DashboardInfoCard>
          <DashboardInfoCard cardTitle={t("progressPercentage")}>
            <div className="flex flex-col gap-2 w-full">
              <span className="text-xl font-semibold text-center">80%</span>
              <ProgressBar percentage={80} />
            </div>
          </DashboardInfoCard>
        </div>
        <Card
          className="h-48 bg-white/60 shadow mt-7 text-center
          min-w-[80%] max-w-[80%] md:min-w-[calc(280px*2+20px)] min-[1075px]:min-w-[calc(280px*3+40px)] xl:min-w-[calc(90%+2*32px)]"
        >
          <CardHeader className="flex items-center justify-center text-2xl font-bold">
            {t("startYourNextLesson")}
          </CardHeader>
          <CardContent>
            <Button className={cn(locale === Locales.ar && "rotate-180")}>
              <Image src={"/arrow.svg"} alt="arrow" width={24} height={24} />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default PlanPage;
