"use client";

import { Languages } from "lucide-react";
import { useLocale } from "@/app/Providers/LocaleContext";

export default function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  const toggleLang = () => {
    const newLang = locale === "ar" ? "en" : "ar";
    setLocale(newLang);
  };

  return (
    <button
      onClick={toggleLang}
      className="text-[#E7A24A] hover:cursor-pointer hover:scale-120 hover:text-[#832411] transition-all duration-200 flex items-center justify-center"
      title={locale === "ar" ? "Switch to English" : "Switch to Arabic"}>
      <Languages size={30} />
    </button>
  );
}
