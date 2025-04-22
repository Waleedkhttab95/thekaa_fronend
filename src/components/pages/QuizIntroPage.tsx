"use client";
import { useTranslations } from "next-intl";
import { Card, CardTitle } from "../molecules/card";
import { Label } from "../atoms/label";
import { Button } from "../atoms/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import QuizTips from "../molecules/QuizTips";
import QuizDetails from "../molecules/QuizDetails";

const QuizIntroPage = () => {
  const t = useTranslations("quizIntroPage");
  const router = useRouter();

  const quizData = {
    subject: "الكيمياء",
    quizType: "أسبوعي",
    questionCount: 2,
    length: 30,
  };

  return (
    <div className="md:max-w-[100%] flex flex-col items-center px-4 gap-4">
      <div className="max-w-[1213px] lg:w-[100%] md:w-[90%] w-[95%] rounded-[40px] p-4 bg-card-transparent border border-muted/30 backdrop-blur-md">
        <CardTitle className="font-pingar text-xl md:text-2xl text-center px-1">
          {t("title", {
            quizType: quizData.quizType,
            subject: quizData.subject,
          })}
          <Image
            src={"/assets/images/icons/sparkles.svg"}
            alt="sparkles"
            height={0}
            width={0}
            style={{ width: "30px", height: "auto" }}
            className="inline-block"
          />
        </CardTitle>
      </div>
      <Card
        className="max-w-[1213px] lg:w-[100%] md:w-[90%] w-[95%] text-start rounded-[40px] flex flex-col py-10 ps-7 backdrop-blur-md"
        variant="transparent"
      >
        <div className="mb-9 text-2xl md:text-xl">
          <Label className="text-xl font-pingar font-bold md:text-2xl sm:text-2xl lg:text-3xl">
            {t("beforeStart.title")}
          </Label>
          <div className="font-pingar text-[20px] md:text-[20px] sm:text-lg lg:text-[22px] font-medium mt-3">
            {t("beforeStart.content")}
          </div>
        </div>

        <hr className="mb-6" />

        <QuizDetails
          title={t("details.title")}
          details={[
            t("details.type", { quizType: quizData.quizType }),
            t("details.questionCount", {
              questionCount: quizData.questionCount,
            }),
            t("details.length", { length: quizData.length }),
            t("details.grading"),
            t("details.retry"),
          ]}
        />

        <hr className="my-6" />

        <QuizTips
          title={t("tips.title")}
          tips={[t("tips.tip1"), t("tips.tip2"), t("tips.tip3")]}
        />

        <hr className="my-6" />

        <div className="text-[#231F20] text-xl my-9 font-medium text-center md:text-2xl">
          {t("ready")}
          <Image
            src={"/assets/images/icons/rocket.svg"}
            alt="rocket"
            width={0}
            height={0}
            style={{ width: "30px", height: "auto" }}
            className="ltr:scale-x-[-1] inline-block"
          />
        </div>

        <div className="flex justify-center pt-4">
          <Button
            className="text-[16px] font-pingar font-bold w-[264px] h-[56px] flex flex-row justify-center items-center text-start select-none"
            onClick={() => {
              router.push("/test");
            }}
          >
            {t("startButton")}
            <Image
              src={"/arrow.svg"}
              alt="arrow"
              width={0}
              height={0}
              style={{ width: "25px", height: "auto" }}
              className={"ltr:scale-x-[-1]"}
            />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default QuizIntroPage;
