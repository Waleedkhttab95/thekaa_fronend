"use client";

import React from "react";
import { Label } from "../atoms/label";
import Image from "next/image";

interface QuizTipsProps {
  title: string;
  tips: string[];
}

const QuizTips: React.FC<QuizTipsProps> = ({ title, tips }) => {
  return (
    <div className="space-y-5 my-7">
      <Label className="font-pingar flex flex-row text-xl md:text-xl sm:text:xl lg:text-3xl items-center">
        <Image
          src={"/assets/images/icons/bulb.svg"}
          alt="light bulb"
          width={0}
          height={0}
          style={{ width: "28px", height: "auto" }}
        ></Image>
        {title}
      </Label>
      <div>
        {tips.map((tip, index) => (
          <Label
            key={index}
            className="flex flex-row gap-2 text-lg sm:text-xl md:text-lg lg:text-2xl font-pingar text-[#6C6063]"
          >
            <Image
              src={"/assets/images/icons/check-mark.svg"}
              alt="check mark"
              width={0}
              height={0}
              style={{ width: "19px", height: "auto" }}
            ></Image>
            {tip}
          </Label>
        ))}
      </div>
    </div>
  );
};

export default QuizTips;
