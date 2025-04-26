import { useTranslations } from "next-intl";
import DashboardCard from "../molecules/DashboardCard";
import DashboardRoundedStats from "../atoms/dashboard-rouneded-stats";
import ProgressBar from "../atoms/progressBar";
import StatsCard from "../molecules/StatsCard";

const ReportsPage = () => {
  const t = useTranslations("reportsPage");

  return (
    <div>
      <p className="text-2xl font-bold">{t("reports")}</p>
      <div className="bg-[url('/student-profile-bg.png')] rounded-[90px] md:rounded-[40px] bg-cover min-h-[880px] mt-10 py-14 px-2 flex flex-col items-center">
        <div className="w-full flex flex-wrap ps-8 gap-y-8 gap-x-5 xl:gap-x-8 items-center justify-start max-[1113px]:justify-center">
          <DashboardCard cardTitle={t("currentLevel")}>
            <StatsCard text={t("levels.advanced")} bgColor="bg-green-500" />
          </DashboardCard>
          <DashboardCard cardTitle={t("completionRate")}>
            <div className="flex flex-col gap-2 w-full">
              <span className="text-xl font-semibold text-center">80%</span>
              <ProgressBar percentage={80} />
            </div>
          </DashboardCard>
          <DashboardCard cardTitle={t("changeInLevel")}>
            <StatsCard
              text={t("levelChanges.decliningLevel")}
              bgColor="bg-red-500"
              svgPath="/trade-down.svg"
              alt="declining level"
            />
          </DashboardCard>
        </div>
        <p className="text-2xl font-bold mt-16 self-start max-[1113px]:self-center ps-10">
          {t("examsDetails")}
        </p>
        <div className="w-full flex flex-wrap ps-8 gap-y-8 gap-x-5 xl:gap-x-8 mt-8 xl:mt-3 items-center justify-start max-[1113px]:justify-center">
          <DashboardCard cardTitle={t("numberOfPassedExams")}>
            <DashboardRoundedStats stats={3} />
          </DashboardCard>
          <DashboardCard cardTitle={t("numberOfunPassedExams")}>
            <DashboardRoundedStats stats={2} />
          </DashboardCard>
          <DashboardCard cardTitle={t("numberOfDelayedExams")}>
            <DashboardRoundedStats stats={2} />
          </DashboardCard>
          <DashboardCard cardTitle={t("examsSuccessRate")}>
            <div className="flex flex-col gap-2 w-full">
              <span className="text-xl font-semibold text-center">80%</span>
              <ProgressBar percentage={80} />
            </div>
          </DashboardCard>
          <DashboardCard cardTitle={t("performanceLevelInTests")}>
            <StatsCard
              text={t("performanceLevels.advanced")}
              bgColor="bg-green-500"
              svgPath="/trade-up.svg"
              alt="advanced level"
            />
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
