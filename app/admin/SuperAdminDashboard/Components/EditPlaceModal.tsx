"use client";
import React, { useEffect } from "react";
import { Place } from "@/libs/getPlaces";
import { updatePlace } from "@/libs/admin";
import { X } from "lucide-react";
import { useToast } from "@/Components/Toast/useToast";
import { useTranslations } from "next-intl";

interface EditPlaceModalProps {
  place: Place | null;
  onClose: () => void;
  onSuccess: (updatedPlace: Place) => void;
}

const EditPlaceModal = ({ place, onClose, onSuccess }: EditPlaceModalProps) => {
  const [formData, setFormData] = React.useState<Partial<Place>>({
    name: "",
    description: "",
    location: "",
    google_map_url: "",
    region_id: 0,
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const {showToast} = useToast()
  const t = useTranslations();

  useEffect(() => {
   

    if (place) {
      setFormData({
        name: place.name,
        description: place.description,
        location: place.location,
        google_map_url: place.google_map_url,
        region_id: place.region_id,
      });
    }
  }, [place]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "region_id" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!place?.place_id) return;

    setLoading(true);
    setError("");

    const result = await updatePlace(place.place_id, formData);
    if (result) {
      onSuccess(result);
      onClose();
      showToast({
        title: t("editPlace.toastSuccess"),
        type: "success",
      });
    } else {
      setError(t("editPlace.toastError"));
      showToast({
        title: t("editPlace.toastError"),
        type: "error",
      });
    }
    setLoading(false);
  };

  if (!place) return null;

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-lg   flex items-center justify-center z-50 p-4">
      <div className=" glass max-w-lg w-full max-h-screen   overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl  ">{t("editPlace.title")}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-[#FF0000] cursor-pointer transition">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
            </div>
          )}

          {/* Name */}
          <div>
            <label className="input-label pb-1">{t("editPlace.labels.name")}</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              required
              className="input-base"
              placeholder={t("editPlace.place.placeholder.name")}
            />
          </div>

          {/* Location */}
          <div>
            <label className="input-label pb-1">{t("editPlace.labels.location")}</label>
            <input
              type="text"
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
              required
              className="input-base"
              placeholder={t("editPlace.place.placeholder.location")}
            />
          </div>

          {/* Description */}
          <div>
            <label className="input-label pb-1">{t("editPlace.labels.description")}</label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              rows={4}
              className="input-base resize-none"
              placeholder={t("editPlace.place.placeholder.description")}
            />
          </div>

          {/* Google Map URL */}
          <div>
            <label className="input-label pb-1">{t("editPlace.labels.googleMapUrl")}</label>
            <input
              type="url"
              name="google_map_url"
              value={formData.google_map_url || ""}
              onChange={handleChange}
              className="input-base"
              placeholder={t("editPlace.place.placeholder.googleMapUrl")}
            />
          </div>

          {/* Region ID */}
          <div>
            <label className="input-label pb-1">{t("editPlace.labels.regionId")}</label>
            <input
              type="number"
              name="region_id"
              value={formData.region_id || 0}
              onChange={handleChange}
              className="input-base"
              placeholder={t("editPlace.place.placeholder.regionId")}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-normal">
              {loading ? t("editPlace.actions.saving") : t("editPlace.actions.saveChanges")}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-danger ">
              {t("editPlace.actions.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlaceModal;
