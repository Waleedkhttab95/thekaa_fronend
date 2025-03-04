"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/atoms/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { getRecoverPasswordSchema } from "@/lib/schemas";
import { useLocale, useTranslations } from "next-intl";

export const RecoverPasswordForm = () => {
  const t = useTranslations("RecoverPasswordPage");
  const locale = useLocale();

  const form = useForm<z.infer<ReturnType<typeof getRecoverPasswordSchema>>>({
    resolver: zodResolver(getRecoverPasswordSchema(t)),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    form.clearErrors();
  }, [locale, form]);

  function onSubmit(
    data: z.infer<ReturnType<typeof getRecoverPasswordSchema>>
  ) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[487px] flex flex-col gap-y-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inputLabel")}</FormLabel>
              <FormControl>
                <Input placeholder={t("inputPlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex flex-col gap-y-4 mt-6">
          <Button type="submit">{t("send")}</Button>
        </div>
      </form>
    </Form>
  );
};

export default RecoverPasswordForm;
