import React, { PropsWithChildren } from "react";

const QuizIntroLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="container mx-auto max-w-[1300px] lg:w-[100%] overflow-hidden bg-[url(/assets/images/quiz-intro-bg.svg)] bg-cover bg-no-repeat pt-[46px] rounded-[40px] flex items-center justify-center">
      {children}
    </div>
  );
};

export default QuizIntroLayout;
