import { useTranslations } from "next-intl";
import DashboardCard from "../molecules/DashboardCard";
import ProgressBar from "../atoms/progressBar";
import LessonCard from "../atoms/LessonCard";

const lessons = [
  {
    title: "تصنيف الكائنات الحية",
    date: "8/3/2025",
  },
  {
    title: "دورة الماء في الطبيعة",
    date: "20/3/2025",
  },
  {
    title: "الكهرباء والمغناطيسية",
    date: "20/3/2025",
  },
  {
    title: "الجهاز الهضمي في الإنسان",
    date: "20/3/2025",
  },
  {
    title: "النظام الشمسي والكواكب",
    date: "20/3/2025",
  },
  {
    title: "التغيرات الفيزيائية والكيميائية",
    date: "20/3/2025",
  },
];

const DashboardPage = () => {
  const t = useTranslations("dashboardPage");

  return (
    <div className="flex flex-col">
      <p className="font-bold text-2xl">{t("welcome")}, test 👋</p>
      <div className="mt-7 dashboard-page-grid self-center">
        <div className="flex flex-col gap-y-4">
          <div className="dashboard-first-column-top-section">
            <DashboardCard
              variant="blue"
              left
              flipIcon
              iconPath="./dashboard-icons/current-level.svg"
              alt="current level"
              className="min-w-[420px] h-[318px]"
              text={t("currentLevel")}
              imageClassName="top-7 end-2"
            >
              <div className="flex flex-col gap-2 absolute bottom-16 w-9/12">
                <span className="text-xl font-semibold text-center">80%</span>
                <ProgressBar percentage={80} />
              </div>
            </DashboardCard>
            <div className="flex flex-col gap-y-4">
              <DashboardCard
                variant="pink"
                iconPath="./dashboard-icons/start-test.svg"
                text={t("startTheTest")}
                alt="start test"
                haveArrow
                imageClassName="top-[-31%] start-[-15%]"
              />
              <DashboardCard
                variant="blue"
                iconPath="./dashboard-icons/your-assistant.svg"
                text={t("yourAssistant")}
                alt="your assistant"
                haveArrow
                left
              />
            </div>
          </div>
          <div className="dashboard-first-column-bottom-section">
            <div className="flex gap-5 max-[875px]:flex-col">
              <DashboardCard
                variant="pink"
                iconPath="./dashboard-icons/student-profile.svg"
                text={t("studentProfile")}
                alt="student profile"
                haveArrow
                imageClassName="top-[22%] start-[-3%]"
              />
              <DashboardCard
                variant="pink"
                iconPath="./dashboard-icons/plan.svg"
                text={t("plan")}
                alt="plan"
                haveArrow
                imageClassName="top-[-22%]"
              />
            </div>
            <DashboardCard
              variant="blue"
              iconPath="./dashboard-icons/reports.svg"
              text={t("reports")}
              alt="reports test"
              haveArrow
              left
              imageClassName="top-[-15%]"
            />
          </div>
        </div>
        <div className="dashboard-second-column">
          <DashboardCard
            variant="pink"
            iconPath="./dashboard-icons/start-next-lesson.svg"
            text={t("startYourNextLesson")}
            alt="start your next lesson"
            haveArrow
            left
            imageClassName="top-[-35%] end-[-3%]"
          />

          <DashboardCard
            className="h-[491px]"
            variant="blue"
            iconPath="./dashboard-icons/upcoming-lessons.svg"
            text={t("upcomingLessons")}
            alt="upcoming lessons"
            imageClassName="w-[340px] h-[340px] start-[45px]"
            inLineIconText
          >
            <div className="flex flex-col gap-3 min-w-[350px]">
              {lessons.map((lesson, index) => (
                <LessonCard
                  firstLesson={index === 0}
                  key={lesson.title}
                  lesson={lesson.title}
                  date={lesson.date}
                />
              ))}
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
