"use client";
import React, { ChangeEvent } from "react";
import { Input } from "../atoms/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../atoms/select";
import { RadioGroup, RadioGroupItem } from "../atoms/radio-group";
import { Label } from "../atoms/label";
import { IStudentData } from "@/types/student.type";
import { ControllerRenderProps } from "react-hook-form";
import { getFromSteps } from "@/data/student";
import Image from "next/image";
import { useLocale } from "next-intl";
type props = {
  formField: ControllerRenderProps<
    Partial<IStudentData>,
    keyof Partial<IStudentData>
  >;
  currentStepData: ReturnType<typeof getFromSteps>[number][number];
};
const AddStudentFields = ({ currentStepData, formField }: props) => {
  const locale = useLocale();

  if (currentStepData.type === "number")
    return (
      <Input
        placeholder={currentStepData.placeholder}
        {...formField}
        value={isNaN(formField.value as number) ? "" : formField.value}
        min={currentStepData.name === "age" ? 6 : undefined}
        max={currentStepData.name === "age" ? 12 : undefined}
        onBlur={(e) => {
          if (e.target.value === "") {
            formField.onChange(0);
          }
          formField.onBlur?.();
        }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const parsed = parseFloat(e.target.value);
          // For age field, ensure minimum value is 6
          if (currentStepData.name === "age" && parsed < 6 && parsed > 0) {
            return; // Don't update if value is below 6
          }
          const value = isNaN(parsed) ? "" : parsed;
          formField.onChange(value);
        }}
        type={currentStepData.type}
      />
    );
  else if (currentStepData.type === "text")
    return (
      <Input
        placeholder={currentStepData.placeholder}
        {...formField}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          formField.onChange(value);
        }}
        type={currentStepData.type}
      />
    );
  else if (currentStepData.type === "select")
    return (
      <Select
        onValueChange={formField.onChange}
        defaultValue={formField.value?.toString()}
      >
        <SelectTrigger>
          <SelectValue placeholder={currentStepData.placeholder} />
        </SelectTrigger>
        <SelectContent>
          {currentStepData?.options.length > 0 &&
            currentStepData?.options.map((option) => (
              <SelectItem
                key={option?._id as string}
                value={option?._id as string}
              >
                {option.name as string}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    );
  else if (currentStepData.type === "combo") {
    const gridCols = currentStepData.options.length > 5 ? 6 : 3;
    return (
      <RadioGroup
        onValueChange={formField.onChange}
        value={formField.value as string}
        className={`grid lg:w-fit lg:mx-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-${gridCols} gap-5 mt-4`}
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        {/*  eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {currentStepData.options?.map((option: any) => (
          <div key={`subject-${option._id}`} className="relative ">
            <RadioGroupItem
              value={option._id}
              id={option._id}
              className="sr-only"
            />
            <Label
              htmlFor={option._id}
              className="cursor-pointer block lg:size-[150px] "
            >
              <div
                className={`flex flex-col items-center justify-center p-4 text-center h-full border rounded-md select-none transition-all ${
                  formField.value === option._id
                    ? "border-primary border-2 bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Image
                  src={option.icon ?? "/assets/images/learning.png"}
                  width={69}
                  height={69}
                  alt={option.name}
                  className="mb-6 size-[69px]"
                />
                <span className="text-sm font-bold">{option.name}</span>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    );
  } else return null;
};

export default AddStudentFields;
