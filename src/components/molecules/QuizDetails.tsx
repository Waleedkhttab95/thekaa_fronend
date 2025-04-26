"use client";

import React from "react";
import Image from "next/image";
import { Label } from "../atoms/label";

interface QuizDetailsProps {
  title: string;
  details: string[];
}

const QuizDetails: React.FC<QuizDetailsProps> = ({ title, details }) => {
  return (
    <div className="flex flex-col my-8">
      <Label className="text-xl flex flex-row items-center gap-2 mb-5 md:text-2xl sm:2xl lg:text-3xl">
        <Image
          src={"/assets/images/icons/look.svg"}
          alt="glasses"
          width={0}
          height={0}
          style={{ width: "25px", height: "auto" }}
          className="ltr:scale-x-[-1]"
        />
        {title}
      </Label>
      <div className="flex flex-col gap-2">
        {details.map((item, index) => (
          <Label
            key={index}
            className="flex flex-row gap-2 items-center text-[#6C6063] text-lg md:text-lg sm:xl lg:text-2xl"
          >
            <Image
              src={"/assets/images/icons/pushpin.svg"}
              alt="pushpin"
              width={0}
              height={0}
              style={{ width: "25px", height: "auto" }}
              className="ltr:scale-x-[-1]"
            />
            {item}
          </Label>
        ))}
      </div>
    </div>
  );
};

export default QuizDetails;
