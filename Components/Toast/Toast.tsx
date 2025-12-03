"use client";
import { X, CheckCircle, Info, AlertCircle } from "lucide-react";
import { ToastType } from "./useToast";
import { motion } from "framer-motion";
import { JSX } from "react";

export default function Toast({
  toast,
  onClose,
}: {
  toast: any;
  onClose: () => void;
}) {
  const colors: Record<ToastType, string> = {
    success: "bg-emerald-600",
    error: "bg-[#ff0000]",
    info: "bg-sky-600",
    confirm: "card-ios",
  };

  const icons: Record<ToastType, JSX.Element> = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    info: <Info size={20} />,
    confirm: <Info size={20} />,
  };

  const isConfirm = toast.type === "confirm";

  const handleConfirm = () => {
    if (toast.onConfirm) toast.onConfirm();
    onClose();
  };

  const handleCancel = () => {
    if (toast.onCancel) toast.onCancel();
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.18 }}
      className={`shadow-lg rounded-lg overflow-hidden text-white ${
        isConfirm ? "min-w-sm" : "w-full"
      }`}>
      <div
  className={
    isConfirm
      ? "toast-confirm"
      : toast.type === "success"
      ? "toast-success"
      : "toast-error"
  }
>
  <div className="flex items-start gap-3">
    <div className="mt-1">{icons[toast.type]}</div>
    <div className="flex-1">
      {toast.title && <div className="font-semibold">{toast.title}</div>}
      {toast.description && (
        <div className="text-sm opacity-90 mt-1">{toast.description}</div>
      )}
    </div>

    {!isConfirm && (
      <button
        onClick={onClose}
        className="p-1 rounded-md hover:bg-white/10"
      >
        <X size={16} />
      </button>
    )}
  </div>

  {isConfirm && (
    <div className="flex gap-2 justify-end pt-2">
      <button onClick={handleCancel} className="btn-cancel">
        {toast.cancelText || "Cancel"}
      </button>
      <button onClick={handleConfirm} className="btn-confirm">
        {toast.confirmText || "Confirm"}
      </button>
    </div>
  )}
</div>

    </motion.div>
  );
}
