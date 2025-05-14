"use client";

import { useTranslations } from "next-intl";
import DashboardInfoCard from "../molecules/DashboardInfoCard";
import ProgressBar from "../atoms/progressBar";
import DashboardRoundedStats from "../atoms/dashboard-rouneded-stats";
import StatsCard from "../molecules/StatsCard";
import { useAxiosAuth } from "@/hooks/useAxiosAuth";
import { getCookie } from "cookies-next/client";
import { useGetStudentEducationPlanDetails } from "@/hooks/rqs/assessmentTest";
import { useStudent } from "@/hooks/rqs/students";
import Loading from "../atoms/loading";

const PlanPage = () => {
  const t = useTranslations("planPage");
  const studentId = getCookie("current_user");
  const axiosClient = useAxiosAuth();
  const { data: studentData, isLoading: isUserDataLoading } = useStudent(
    axiosClient,
    studentId as string
  );
  const {
    data: EducationPlanDetails,
    isLoading: isEducationPlanDetailsLoading,
  } = useGetStudentEducationPlanDetails(
    axiosClient,
    studentId as string,
    studentData?.educationPlanId as string,
    {
      enabled: !!studentData?.educationPlanId,
    }
  );

  return (
    <div>
      <p className="text-2xl font-bold">{t("plan")}</p>
      <div className="relative bg-[url('/student-profile-bg.png')] rounded-[90px] md:rounded-[40px] bg-cover min-h-[1000px] sm:min-h-[450px] mt-10 py-12 px-2 flex flex-col items-center">
        {isUserDataLoading || isEducationPlanDetailsLoading ? (
          <div className="absolute top-[28%]">
            <Loading width={200} height={200} />
          </div>
        ) : (
          // todo: extract the content to an organism and make the requests and loading inside it and make similar adjustments to other pages!
          <div className="w-full flex flex-wrap gap-y-8 gap-x-5 xl:gap-x-8 justify-center items-center">
            <DashboardInfoCard cardTitle={t("numberOfLessons")}>
              <DashboardRoundedStats
                stats={EducationPlanDetails?.numberOfLessons}
              />
            </DashboardInfoCard>
            <DashboardInfoCard cardTitle={t("passedLessons")}>
              <DashboardRoundedStats
                stats={EducationPlanDetails?.completedLessons}
              />
            </DashboardInfoCard>
            <DashboardInfoCard cardTitle={t("lessonsNeedComplete")}>
              <DashboardRoundedStats
                stats={EducationPlanDetails?.numberOflessonsLeft}
              />
            </DashboardInfoCard>
            <DashboardInfoCard cardTitle={t("level")}>
              <StatsCard level={EducationPlanDetails?.currentLevelTitle} />
            </DashboardInfoCard>
            <DashboardInfoCard cardTitle={t("performance")}>
              <StatsCard
                level={EducationPlanDetails?.currentLevelTitle}
                text={
                  <p>
                    {EducationPlanDetails?.studentPerformance}
                    <span className="mx-3">/</span>100
                  </p>
                }
              />
            </DashboardInfoCard>
            <DashboardInfoCard cardTitle={t("progressPercentage")}>
              <div className="flex flex-col gap-2 w-full">
                <span className="text-xl font-semibold text-center">
                  {EducationPlanDetails?.planPrecentage}%
                </span>
                <ProgressBar
                  percentage={EducationPlanDetails?.planPrecentage}
                />
              </div>
            </DashboardInfoCard>
          </div>
        )}
        {/* Unused for now maybe we need it later */}
        {/* <Card
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
        </Card> */}
      </div>
    </div>
  );
};
export default PlanPage;
