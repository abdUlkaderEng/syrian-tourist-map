"use client";

import React, { useState } from "react";
import Modal from "@/Components/Modal/Modal";
import InputField from "@/Components/Form/InputField";
import Button from "@/Components/Form/Button";
import { useTranslations } from "next-intl";
import { useToast } from "@/Components/Toast/useToast";
import { useAuthStore } from "@/hooks/Auth/authStore";
import { SendHorizontal } from "lucide-react";
import { Comment } from "@/libs/getComments";
import { addComments } from "@/libs/addComment";

interface CommentsProps {
  onClose: () => void;
  comments?: Comment[];
  onSuccess?: () => void;
  targetId: number;
}
const Comments: React.FC<CommentsProps> = ({
  onClose,
  comments = [],
  onSuccess,
  targetId, // مثلا place_id أو post_id
}) => {
  const t = useTranslations();
  const { showToast } = useToast();
  const usertoken = useAuthStore((state) => state.token);

  const [comment, setComment] = useState("");

  const submitHandler = async () => {
    if (!comment.trim()) return;

    const fd = new FormData();
    fd.append("token", usertoken!.toString());
    fd.append("place_id", targetId.toString());
    fd.append("content", comment);

    const res = await addComments(fd);

    if (res) {
      showToast({
        type: "success",
        title: t("comments.messages.addSuccess"),
      });
      setComment("");
      onSuccess?.();
      return;
    }

    showToast({
      type: "error",
      title: t("comments.messages.addFailed"),
    });
  };

  return (
    <Modal
      title={t("comments.title")}
      onClose={onClose}
      onSubmit={submitHandler}
      overflow      
      >
      <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
        {comments.length === 0 && (
          <p className="text-sm text-gray-500">{t("comments.empty")}</p>
        )}

        {comments.map((c: Comment) => (
          <div key={c.comment_id} className="rounded-lg border p-3 text-sm">
            <div className="flex justify-between mb-1">
              <span className="font-medium">{c.user.name}</span>
              <span className="text-xs text-gray-400">{c.date}</span>
            </div>
            <p className="text-gray-700">{c.content}</p>
          </div>
        ))}
      </div>

      {/* إضافة تعليق */}
      <div className="relative">
      <InputField
        type="text"
        name="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder={t("comments.placeholder")}
        required
      />

        <button  onClick={submitHandler}>
          <SendHorizontal />
        </button>
      </div>
    </Modal>
  );
};

export default Comments;
