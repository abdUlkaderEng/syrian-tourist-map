import { useEffect, useState } from "react";
import { ChevronLeft, ChevronLeftSquare, SendHorizontal } from "lucide-react";
import { Comment, getComments } from "@/libs/getComments";
import { addComments } from "@/libs/addComment";
import { useAuthStore } from "@/hooks/Auth/authStore";
import { useToast } from "@/Components/Toast/useToast";
import { useTranslations } from "next-intl";
import InputField from "@/Components/Form/InputField";
import Button from "@/Components/Form/Button";

interface FlipCardBackProps {
  targetId: number;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function BackPlaceCard({
  targetId,
  onClose,
  onSuccess,
}: FlipCardBackProps) {
  const t = useTranslations();
  const { showToast } = useToast();
  const userToken = useAuthStore((state) => state.token);

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const submitComment = async () => {
    if (!commentText.trim() || !userToken) return;

    const fd = new FormData();
    fd.append("token", userToken.toString());
    fd.append("place_id", targetId.toString());
    fd.append("content", commentText);

    const res = await addComments(fd);

    if (res) {
      showToast({ type: "success", title: t("comments.messages.addSuccess") });
      const updated = await getComments(targetId);
      setComments(Array.isArray(updated) ? updated : []);
      setCommentText('')
    } else {
      showToast({ type: "error", title: t("comments.messages.addFailed") });
    }
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const res = await getComments(targetId);
      setComments(Array.isArray(res) ? res : []);
      setLoading(false);
    };

    fetch();
  }, [targetId]);

  return (
    <div className="h-full overflow-auto flex flex-col rounded-xl p-4 glass">
      {/* رأس البطاقة */}
      <div className="flex justify-between items-center mb-2 shrink-0">
        <h3 className="font-bold">{t("comments.title")}</h3>
        <button onClick={onClose} className="text-sm text-gray-500">
          <ChevronLeft />
        </button>
      </div>

      {/* قائمة التعليقات */}
      <div className="flex-1 overflow-y-auto mb-3 space-y-2 ">
        {comments.length === 0 && (
          <p className="text-sm text-gray-500">{t("comments.empty")}</p>
        )}
        {comments.map((comment) => (
          <div key={comment.comment_id} className="comment-item">
            <div className="comment-avatar">
              {comment.user?.name?.[0] ?? "?"}
            </div>

            <div className="comment-body">
              <div className="comment-header">
                <span className="comment-author">
                  {comment.user?.name ?? "مستخدم"}
                </span>
                <span className="comment-date">منذ {comment.date}</span>
              </div>

              <p className="comment-text">{comment.content}</p>
            </div>
          </div>
        ))}

        {/* إدخال تعليق */}
        <div className="comment-input-wrapper shrink-0">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="اكتب تعليقك..."
            className="comment-input"
          />
          <button className="comment-send" onClick={submitComment}>
            <SendHorizontal />
          </button>
        </div>

        {/* <div className="flex gap-2">
          <InputField
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={t("comments.placeholder")}
          />
          <button className="btn-normal  " onClick={submitComment}>
          </button>
        </div> */}
      </div>
    </div>
  );
}









