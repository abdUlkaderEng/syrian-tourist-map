"use client";
import React from "react";
import { Place } from "@/libs/getPlaces";
import { addPlace } from "@/libs/admin";
import { useToast } from "@/Components/Toast/useToast";
import { useTranslations } from "next-intl";
import Button from "@/Components/Form/Button";
import Modal from "@/Components/Modal/Modal";
import InputField from "@/Components/Form/InputField";
import Textarea from "@/Components/Form/TextArea";
import Select from "@/Components/Form/Select";
import { usePlaceForm } from "@/hooks/usePlaceForm";
import Image from "next/image";

interface AddPlaceModalProps {
  onClose: () => void;
  onSuccess: (newPlace: Place) => void;
}

const AddPlaceModal = ({ onClose, onSuccess }: AddPlaceModalProps) => {
  const { showToast } = useToast();
  const t = useTranslations();

  const { formData, previewUrl, loading, error, handleChange, handleSubmit } =
    usePlaceForm({
      onSubmit: async (form) => addPlace(form),
    });

  const submitHandler = async (e: React.FormEvent) => {
    const res = await handleSubmit(e);
    
    if (res.status === 201) {
      onSuccess(res);
      onClose();
      showToast({
        title: t("successMessages.placeAdded"),
        type: "success",
      });
    } else {
      showToast({
        title: t("errorMessages.placeAddFailed"),
        type: "error",
      });
    }
  };

  return (
    <Modal
      title={t("placeManage.AddPlace")}
      onClose={onClose}
      onSubmit={submitHandler}
      overflow>
      <InputField
        type="text"
        name="name_ar"
        label={t("placeManage.labels.name_ar")}
        value={formData.name_ar || ""}
        onChange={handleChange}
        placeholder={t("placeManage.place.placeholder.name_ar")}
        required
      />
      <InputField
        type="text"
        name="name_en"
        label={t("placeManage.labels.name_en")}
        value={formData.name_en || ""}
        onChange={handleChange}
        placeholder={t("placeManage.place.placeholder.name_en")}
        required
      />
      

      <InputField
        type="text"
        name="location_ar"
        label={t("placeManage.labels.location_ar")}
        value={formData.location_ar || ""}
        onChange={handleChange}
        placeholder={t("placeManage.place.placeholder.location_ar")}
        required
      />
      <InputField
        type="text"
        name="location_en"
        label={t("placeManage.labels.location_en")}
        value={formData.location_en || ""}
        onChange={handleChange}
        placeholder={t("placeManage.place.placeholder.location_en")}
        required
      />

      <Textarea
        name="description_ar"
        label={t("placeManage.labels.description_ar")}
        value={formData.description_ar || ""}
        onChange={handleChange}
        rows={6}
        required
        placeholder={t("placeManage.place.placeholder.description_ar")}
      />
      <Textarea
        name="description_en"
        label={t("placeManage.labels.description_en")}
        value={formData.description_en || ""}
        onChange={handleChange}
        rows={6}
        required
        placeholder={t("placeManage.place.placeholder.description_en")}
      />

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

      <InputField
        type="file"
        name="image"
        label={t("placeManage.labels.image")}
        accept="image/*"
        onChange={handleChange}
      />

      {previewUrl && (
        <Image
          width={200}
          height={200}
          src={previewUrl}
          alt="preview"
          className="mt-2 h-40 w-full object-cover rounded-md"
        />
      )}

      <Select
        name="type"
        label={t("placeManage.labels.type")}
        value={formData.type || "historical"}
        onChange={handleChange}
        options={[
          { value: "historical", label: t("placeManage.types.historical") },
          {
            value: "entertainment",
            label: t("placeManage.types.entertainment"),
          },
          { value: "service", label: t("placeManage.types.service") },
        ]}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={loading} className="flex-1 btn-normal">
          {loading
            ? t("placeManage.actions.saving")
            : t("placeManage.actions.save")}
        </Button>
        <Button type="button" onClick={onClose} className="flex-1 btn-danger">
          {t("placeManage.actions.cancel")}
        </Button>
      </div>
    </Modal>
  );
};

export default AddPlaceModal;
