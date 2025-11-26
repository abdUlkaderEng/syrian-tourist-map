"use client";
import { X, CheckCircle, Info, AlertCircle } from "lucide-react";
import { ToastType } from "./useToast";
import { motion } from "framer-motion";
import { JSX } from "react";

export default function Toast({
  toast,
  onClose
}: {
  toast: any;
  onClose: () => void;
}) {
  const colors: Record<ToastType, string> = {
    success: "bg-emerald-600",
    error: "bg-rose-600",
    info: "bg-sky-600",
  };

  const icons: Record<ToastType, JSX.Element> = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    info: <Info size={20} />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.18 }}
      className={`w-full shadow-lg rounded-lg overflow-hidden text-white`}
    >
      <div
        className={`flex items-start gap-3 p-3 ${colors[toast.type]}`}
      >
        <div className="mt-1">
          {icons[toast.type]}
        </div>

        <div className="flex-1">
          {toast.title && <div className="font-semibold">{toast.title}</div>}
          {toast.description && (
            <div className="text-sm opacity-90 mt-1">{toast.description}</div>
          )}
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-white/10"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
}
