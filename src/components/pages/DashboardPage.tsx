"use client";

import { useTranslations } from "next-intl";
import DashboardCard from "../molecules/DashboardCard";
import ProgressBar from "../atoms/progressBar";
import LessonCard from "../atoms/LessonCard";
import { useStudent } from "@/hooks/rqs/students";
import { useAxiosAuth } from "@/hooks/useAxiosAuth";
import { getCookie } from "cookies-next/client";
import { useNextLessons, useStudentProgress } from "@/hooks/rqs/calender";
import Link from "next/link";
import { ProtectedRoutes } from "@/config/routes";

const DashboardPage = () => {
  const t = useTranslations("dashboardPage");
  const axiosAuth = useAxiosAuth();
  const studentId = getCookie("current_user") as string;
  const { data: studentData, isLoading: isStudentDataLoading } = useStudent(
    axiosAuth,
    studentId as string
  );

  const { data: progress, isPending: progressLoading } = useStudentProgress(
    axiosAuth,
    studentId
  );

  const {
    data: nextLessons,
    isLoading: isNextLessonsLoading,
    isError: isError,
  } = useNextLessons(axiosAuth, studentId, studentData?.educationPlanId || "");

  const formatDateToYMD = (dateString: string): string => {
    return dateString.slice(0, 10);
  };

  const lessonDay = progress?.lessonDay;
  const quizDay = progress?.quizDay;

  return (
    <div className="flex flex-col items-center sm:w-full">
      {isStudentDataLoading ? (
        <p className="font-bold text-2xl sm:self-start sm:ps-3">. . .</p>
      ) : (
        <p className="font-bold text-2xl sm:self-start sm:ps-3">
          {t("welcome")}, <span>{studentData?.firstName ?? "??"}</span> 👋
        </p>
      )}
      <div className="mt-7 dashboard-page-grid self-center">
        <div className="flex flex-col gap-y-4">
          <div className="dashboard-first-column-top-section">
            <DashboardCard
              variant="blue"
              left
              flipIcon
              iconPath="./dashboard-icons/current-level.svg"
              alt="current level"
              className="sm:min-w-[412.86px] max-w-[80%] sm:max-w-[100%] h-[318px]"
              text={t("currentLevel")}
              imageClassName="top-7 end-2"
            >
              <div className="flex flex-col gap-2 absolute bottom-16 w-9/12">
                <span className="text-xl font-semibold text-center">
                  {progressLoading ? <p>...</p> : progress?.planPrecentage}%
                </span>
                <ProgressBar percentage={Number(progress?.planPrecentage)} />
              </div>
            </DashboardCard>
            <div className="flex flex-col gap-y-4">
              <Link href={quizDay ? ProtectedRoutes.Quiz : "#"}>
                <DashboardCard
                  variant="pink"
                  iconPath="./dashboard-icons/start-test.svg"
                  text={t("startTheTest")}
                  alt="start test"
                  haveArrow
                  imageClassName="top-[-31%] start-[-15%]"
                  tooltip={quizDay ? undefined : t("quizDay")}
                />
              </Link>
              <Link href={ProtectedRoutes.AiChat}>
                <DashboardCard
                  variant="blue"
                  iconPath="./dashboard-icons/your-assistant.svg"
                  text={t("yourAssistant")}
                  alt="your assistant"
                  haveArrow
                  left
                />
              </Link>
            </div>
          </div>
          <div className="dashboard-first-column-bottom-section">
            <div className="dashboard-first-column-pink-row ">
              <DashboardCard
                className="sm:min-w-[300px] max-w-[80%] sm:max-w-[100%]"
                variant="pink"
                iconPath="./dashboard-icons/student-profile.svg"
                text={t("studentProfile")}
                alt="student profile"
                haveArrow
                imageClassName="top-[22%] start-[-3%]"
              />
              <Link href={ProtectedRoutes.Plan}>
                <DashboardCard
                  className=""
                  variant="pink"
                  iconPath="./dashboard-icons/plan.svg"
                  text={t("plan")}
                  alt="plan"
                  haveArrow
                  imageClassName="top-[-22%]"
                />
              </Link>
            </div>
            <DashboardCard
              variant="blue"
              iconPath="./dashboard-icons/reports.svg"
              text={t("reports")}
              alt="reports test"
              haveArrow
              left
              imageClassName="top-[-15%]"
              disabled
            />
          </div>
        </div>
        <div className="dashboard-second-column">
          <Link href={lessonDay ? `${ProtectedRoutes.Lesson}/1` : "#"}>
            <DashboardCard
              variant="pink"
              iconPath="./dashboard-icons/start-next-lesson.svg"
              text={t("startYourNextLesson")}
              alt="start your next lesson"
              haveArrow
              left
              imageClassName="top-[-35%] end-[-3%]"
              tooltip={lessonDay ? "" : t("lessonDay")}
            />
          </Link>

          <DashboardCard
            variant="blue"
            iconPath="./dashboard-icons/upcoming-lessons.svg"
            text={t("upcomingLessons")}
            alt="upcoming lessons"
            imageClassName="w-[340px] h-[340px] start-[45px]"
            inLineIconText
          >
            <div className="flex flex-col gap-3  min-w-[340px] sm:min-w-[33%] sm:max-w-[100%]">
              {isNextLessonsLoading ? (
                <p className="text-center">{t("nextLessonsLoading")}</p>
              ) : nextLessons && nextLessons.length > 0 ? (
                nextLessons.map((lesson, index) => (
                  <LessonCard
                    firstLesson={index === 0}
                    key={lesson.lessonId}
                    lesson={lesson.lessonName}
                    date={formatDateToYMD(lesson.date)}
                  />
                ))
              ) : (
                <>{isError && <p>{t("nextLessonsError")}</p>}</>
              )}
            </div>
          </DashboardCard>
        </div>
      </div>

      <div className="flex flex-col gap-4 items-center sm:hidden mt-7">
        <DashboardCard
          variant="blue"
          left
          flipIcon
          iconPath="./dashboard-icons/current-level.svg"
          alt="current level"
          text={t("currentLevel")}
          imageClassName="top-7 end-2"
          haveArrow
        />
        <Link href={quizDay ? ProtectedRoutes.Quiz : "#"}>
          <DashboardCard
            variant="pink"
            iconPath="./dashboard-icons/start-test.svg"
            text={t("startTheTest")}
            alt="start test"
            haveArrow
            imageClassName="top-[-31%] start-[-15%]"
            tooltip={quizDay ? undefined : t("quizDay")}
          />
        </Link>
        <DashboardCard
          variant="blue"
          iconPath="./dashboard-icons/your-assistant.svg"
          text={t("yourAssistant")}
          alt="your assistant"
          haveArrow
          left
        />
        <DashboardCard
          className=""
          variant="pink"
          iconPath="./dashboard-icons/student-profile.svg"
          text={t("studentProfile")}
          alt="student profile"
          haveArrow
          imageClassName="top-[22%] start-[-3%]"
        />
        <DashboardCard
          className=""
          variant="pink"
          iconPath="./dashboard-icons/plan.svg"
          text={t("plan")}
          alt="plan"
          haveArrow
          imageClassName="top-[-22%]"
        />
        <DashboardCard
          variant="blue"
          iconPath="./dashboard-icons/reports.svg"
          text={t("reports")}
          alt="reports test"
          haveArrow
          left
          imageClassName="top-[-15%]"
          disabled
        />

        <Link href={lessonDay ? `${ProtectedRoutes.Lesson}/1` : "#"}>
          <DashboardCard
            variant="pink"
            iconPath="./dashboard-icons/start-next-lesson.svg"
            text={t("startYourNextLesson")}
            alt="start your next lesson"
            haveArrow
            left
            imageClassName="top-[-35%] end-[-3%]"
            tooltip={lessonDay ? "" : t("lessonDay")}
          />
        </Link>
        <DashboardCard
          className="h-[491px] ps-3"
          variant="blue"
          iconPath="./dashboard-icons/upcoming-lessons.svg"
          text={t("upcomingLessons")}
          alt="upcoming lessons"
          imageClassName="w-[340px] h-[340px] start-[45px]"
          inLineIconText
        >
          <div className="flex flex-col gap-3">
            {isNextLessonsLoading ? (
              <p className="text-center">{t("nextLessonsLoading")}</p>
            ) : nextLessons && nextLessons.length > 0 ? (
              nextLessons.map((lesson, index) => (
                <LessonCard
                  firstLesson={index === 0}
                  key={lesson.lessonId}
                  lesson={lesson.lessonName}
                  date={formatDateToYMD(lesson.date)}
                />
              ))
            ) : (
              <>{isError && <p>{t("nextLessonsError")}</p>}</>
            )}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};
export default DashboardPage;
