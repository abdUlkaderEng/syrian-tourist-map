"use client";

import { useEffect, useState } from "react";
import { NextIntlClientProvider } from "next-intl";
import { useLocale } from "./LocaleContext";

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const { locale } = useLocale();
  const [messages, setMessages] = useState({});

  useEffect(() => {
    // load messages for the active locale
    import(`../../public/locales/${locale}/common.json`).then((mod) =>
      setMessages(mod.default)
    );
  }, [locale]);

  if (!Object.keys(messages).length) return null; // loading

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
