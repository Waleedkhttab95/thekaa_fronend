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

const EditProfileForm = () => {
  const t = useTranslations("studentProfile");
  const locale = useLocale();

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

  useEffect(() => {
    form.clearErrors();
  }, [locale, form]);

  const onAvatarChange = (newAvatar: string) => {
    form.setValue("avatar", newAvatar);
  };

  const onSubmit = (
    values: z.infer<ReturnType<typeof getEditProfileSchema>>
  ) => {
    console.log(values);
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
        />

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

        <Button type="submit">{t("saveChanges")}</Button>
      </form>
    </Form>
  );
};

export default EditProfileForm;
