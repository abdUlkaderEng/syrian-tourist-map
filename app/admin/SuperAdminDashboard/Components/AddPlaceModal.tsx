"use client";
import React from "react";
import { Place } from "@/libs/getPlaces";
import { addPlace } from "@/libs/admin";
import { useToast } from "@/Components/Toast/useToast";
import { useTranslations } from "next-intl";
import Button from "@/Components/Form/Button";
import Modal from "@/Components/Modal/Modal";
import InputField from "@/Components/Form/InputField";

interface AddPlaceModalProps {
  onClose: () => void;
  onSuccess: (newPlace: Place) => void;
}

const AddPlaceModal = ({ onClose, onSuccess }: AddPlaceModalProps) => {
  const [formData, setFormData] = React.useState<Partial<Place>>({
    name: "",
    description: "",
    location: "",
    google_map_url: "",
    region_id: 0,
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const { showToast } = useToast();
  const t = useTranslations();

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
    setLoading(true);
    setError("");

    const payload: Omit<Place, "place_id"> = {
      place_id: 0,
      name: formData.name || "",
      description: formData.description || "",
      location: formData.location || "",
      google_map_url: formData.google_map_url || "",
      region_id: formData.region_id || 0,
    } as unknown as Omit<Place, "place_id">;

    const result = await addPlace(payload as any);
    if (result) {
      onSuccess(result);
      onClose();
      showToast({ title: t("successMessages.placeAdded"), type: "success" });
    } else {
      setError(t("errorMessages.placeAddFailed"));
      showToast({ title: t("errorMessages.placeAddFailed"), type: "error" });
    }

    setLoading(false);
  };

  return (
    <Modal
      title={t("placeManage.AddPlace")}
      onClose={onClose}
      onSubmit={handleSubmit}
      overflow>
      <InputField
        type="text"
        name="name"
        label={t("placeManage.labels.name")}
        value={formData.name || ""}
        onChange={handleChange}
        required
        placeholder={t("placeManage.place.placeholder.name")}
      />

      <InputField
        type="text"
        name="location"
        label={t("placeManage.labels.location")}
        value={formData.location || ""}
        onChange={handleChange}
        required
        placeholder={t("placeManage.place.placeholder.location")}
      />

      <div>
        <label className="mb-1 block font-medium">
          {t("placeManage.labels.description")}
        </label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={(e) => handleChange(e as any)}
          required
          placeholder={t("placeManage.place.placeholder.description")}
          className="w-full p-3 input-base rounded-md"
          rows={6}
        />
      </div>

      <InputField
        type="url"
        name="google_map_url"
        label={t("placeManage.labels.googleMapUrl")}
        value={formData.google_map_url || ""}
        onChange={handleChange}
        placeholder={t("placeManage.place.placeholder.googleMapUrl")}
      />

      <InputField
        type="number"
        name="region_id"
        label={t("placeManage.labels.regionId")}
        value={formData.region_id ? String(formData.region_id) : ""}
        onChange={handleChange}
        placeholder={t("placeManage.place.placeholder.regionId")}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={loading} className="flex-1 btn-normal">
          {loading
            ? t("placeManage.actions.saving")
            : t("placeManage.actions.saveChanges")}
        </Button>
        <Button type="button" onClick={onClose} className="flex-1 btn-danger ">
          {t("placeManage.actions.cancel")}
        </Button>
      </div>
    </Modal>
  );
};

export default AddPlaceModal;
