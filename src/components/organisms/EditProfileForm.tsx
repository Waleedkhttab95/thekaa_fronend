"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../atoms/form";
import { Input } from "../atoms/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../atoms/select";
import { Button } from "../atoms/button";

// todo: edit schema and add error messages for it for both langauges
const studentSchema = z.object({
  name: z.string().min(1),
  age: z.string().min(1),
  educationLevel: z.string().min(1),
  subject: z.string().min(1),
});

type StudentFormValues = z.infer<typeof studentSchema>;

const EditProfileForm = () => {
  const t = useTranslations("studentProfile");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      age: "",
      educationLevel: "",
      subject: "",
    },
  });

  const onSubmit = (values: StudentFormValues) => {
    setIsSubmitting(true);
    console.log(values);
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 w-full max-w-md px-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("nameLabel")}</FormLabel>
              <FormControl>
                <Input placeholder={t("namePlcaeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("ageLabel")}</FormLabel>
              <FormControl>
                <Input placeholder={t("agePlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* //todo: there is an endpoint for the level and subject use it to fill the options */}
        <FormField
          control={form.control}
          name="educationLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("educationLevelLabel")}</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder={t("educationLevelPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="highSchool">High School</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("subjectLable")}</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder={t("subjectPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Math</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {t("saveChanges")}
        </Button>
      </form>
    </Form>
  );
};

export default EditProfileForm;
