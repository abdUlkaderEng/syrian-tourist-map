"use client";
import React, { useState, useCallback, useEffect } from "react";
import { ToastContext, ToastOptions } from "./useToast";
import { AnimatePresence } from "framer-motion";
import Toast from "./Toast";

function genId() {
  return Math.random().toString(36).slice(2, 10);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<any[]>([]);

  const showToast = useCallback((t: ToastOptions) => {
    const id = genId();

    setToasts((v) => [
      {
        id,
        ...t,
        type: t.type ?? "info",
        duration: t.duration ?? 4000,
      },
      ...v,
    ]);

    return id;
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((v) => v.filter((x) => x.id !== id));
  }, []);

  // AUTO DISMISS + PAUSE ON HOVER
  useEffect(() => {
    const timers: Record<string, number> = {};

    toasts.forEach((t) => {
      if (timers[t.id]) return;

      const elem = document.getElementById("toast-" + t.id);
      const timeout = t.duration;

      let start: any;
      let remaining = timeout;

      const tick = () => {
        start = Date.now();
        timers[t.id] = window.setTimeout(() => {
          dismissToast(t.id);
        }, remaining);
      };

      tick();

      const pause = () => {
        clearTimeout(timers[t.id]);
        remaining -= Date.now() - start;
      };

      const resume = () => tick();

      elem?.addEventListener("mouseenter", pause);
      elem?.addEventListener("mouseleave", resume);
    });

    return () => Object.values(timers).forEach(clearTimeout);
  }, [toasts, dismissToast]);

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}

      <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-xs">
        <AnimatePresence>
          {toasts.map((t) => (
            <div id={"toast-" + t.id} key={t.id}>
              <Toast toast={t} onClose={() => dismissToast(t.id)} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
