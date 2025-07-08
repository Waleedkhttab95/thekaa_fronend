"use client";

import { useRouter } from "next/navigation";
import { Button } from "../atoms/button";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface Props {
  open: boolean;
  onClose?: () => void;
  score?: number;
}

export const ResultBox = ({ open, score }: Props) => {
  const router = useRouter();
  const t = useTranslations("quiz");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleOk = () => {
    setLoading(true);
    router.push("/dashboard");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl min-w-[300px] max-w-sm text-center">
        <h2 className="text-xl font-bold mb-4">{t("successDescription")}</h2>
        {score !== undefined && (
          <p className="mb-4 text-lg">
            {t("result")} {score}
          </p>
        )}
        <Button onClick={handleOk} disabled={loading}>
          {loading ? t("loadingResult") : t("ok")}
        </Button>
      </div>
    </div>
  );
};
