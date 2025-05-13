"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
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
import AvatarEditorWithCrop from "./AvatarWithEdit";
import { Button } from "../atoms/button";
import { getEditProfileSchema } from "@/lib/schemas";
import { useEffect } from "react";
import { getCookie } from "cookies-next/client";
import { useStudent } from "@/hooks/rqs/students";
import { useGradeLevels, useSubjects } from "@/hooks/rqs/content";
import { useAxiosAuth } from "@/hooks/useAxiosAuth";
import { Locales } from "@/types/locales.enum";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStudent } from "@/services/students";
import { IStudentData } from "@/types/student.type";
import { toast } from "../atoms/sooner";
import { STUDENTS_QUERY } from "@/config/qr.constants";

const EditProfileForm = () => {
  const t = useTranslations("studentProfile");
  const locale = useLocale();
  const axiosClient = useAxiosAuth();
  const studentId = getCookie("current_user");
  const queryClient = useQueryClient();

  const form = useForm<z.infer<ReturnType<typeof getEditProfileSchema>>>({
    resolver: zodResolver(getEditProfileSchema(t)),
    defaultValues: {
      avatar: "",
      name: "",
      age: "",
      educationLevel: "",
      subject: "",
    },
  });

  const { data: studentData, isLoading: isStudentLoading } = useStudent(
    axiosClient,
    studentId as string
  );

  const { data: grades } = useGradeLevels(locale as Locales);
  const { data: subjects } = useSubjects(locale as Locales);

  useEffect(() => {
    form.clearErrors();
  }, [locale, form]);

  useEffect(() => {
    if (studentData && grades && subjects) {
      form.reset({
        avatar: studentData.profileImage || "",
        name: studentData.firstName || "",
        age: studentData.age?.toString() || "",
        educationLevel: studentData.grade || "",
        subject: studentData.subject || "",
      });
    }
  }, [studentData, form, locale, grades, subjects]);

  const onAvatarChange = (newAvatar: string) => {
    form.setValue("avatar", newAvatar);
  };

  const updateMutation = useMutation({
    mutationFn: (data: Partial<IStudentData>) =>
      updateStudent(axiosClient, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY, studentId] });
      toast({
        title: t("updatedSuccess"),
        description: t("updateSuccessDescription"),
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: t("updateFailed"),
        description: t("updateFailedDescription"),
        variant: "destructive",
      });
    },
  });

  const onSubmit = (
    values: z.infer<ReturnType<typeof getEditProfileSchema>>
  ) => {
    if (!studentId) return;

    updateMutation.mutate({
      _id: studentId as string,
      profileImage: values.avatar,
      firstName: values.name,
      age: Number(values.age),
      grade: values.educationLevel,
      subject: values.subject,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 w-full max-w-md px-5"
      >
        <AvatarEditorWithCrop
          avatar={form.watch("avatar") || ""}
          onAvatarChange={onAvatarChange}
          avatarFallback={form.watch("name") || ""}
          resetAvatar={false}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("nameLabel")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("namePlcaeholder")}
                  value={isStudentLoading ? t("loadingData") : field.value}
                  onChange={field.onChange}
                  disabled={isStudentLoading}
                />
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
                <Input
                  placeholder={t("agePlaceholder")}
                  value={isStudentLoading ? t("loadingData") : field.value}
                  onChange={field.onChange}
                  disabled={isStudentLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="educationLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("educationLevelLabel")}</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={!grades || isStudentLoading}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue
                      placeholder={
                        isStudentLoading
                          ? t("loadingData")
                          : t("educationLevelPlaceholder")
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {grades?.map((grade) => (
                      <SelectItem key={grade._id} value={grade._id}>
                        {grade.name}
                      </SelectItem>
                    ))}
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
                  value={field.value}
                  disabled={!subjects || isStudentLoading}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue
                      placeholder={
                        isStudentLoading
                          ? t("loadingData")
                          : t("subjectPlaceholder")
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects?.map((subject) => (
                      <SelectItem key={subject._id} value={subject._id}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isStudentLoading || updateMutation.isPending}
        >
          {updateMutation.isPending ? t("saving") : t("saveChanges")}
        </Button>
      </form>
    </Form>
  );
};

export default EditProfileForm;
