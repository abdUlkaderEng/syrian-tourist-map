"use client";
import React, { useEffect } from "react";
import { Place } from "@/libs/getPlaces";
import { updatePlace } from "@/libs/admin";
import { useToast } from "@/Components/Toast/useToast";
import { useTranslations } from "next-intl";
import Button from "@/Components/Form/Button";
import Modal from "@/Components/Modal/Modal";
import InputField from "@/Components/Form/InputField";
import Textarea from "@/Components/Form/TextArea";
import Select from "@/Components/Form/Select";
import Image from "next/image";
import { audio } from "framer-motion/client";
import { usePlaceForm } from "@/hooks/usePlaceForm";

interface EditPlaceModalProps {
  place: Place | null;
  onClose: () => void;
  onSuccess: (updatedPlace: Place) => void;
}

const EditPlaceModal = ({ place, onClose, onSuccess }: EditPlaceModalProps) => {
  // const [formData, setFormData] = React.useState<Partial<Place>>({
  //   name: "",
  //   description: "",
  //   location: "",
  //   google_map_url: "",
  //   region_id: 0,
  //   image_url: undefined,
  //   type: "historical",
  // });
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  // const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  // const [loading, setLoading] = React.useState(false);
  // const [error, setError] = React.useState("");
  const { showToast } = useToast();
  const t = useTranslations();



const {
    formData,
    previewUrl,
    loading,
    error,
    handleChange,
    handleSubmit,
  } = usePlaceForm({
    place,
    onSubmit: async (form) => {
      if (!place) return null;
      return updatePlace(place.place_id, form);
    },
  });
if (!place) return null;

  const submitHandler = async (e: React.FormEvent) => {
    const result = await handleSubmit(e);
    if (result.status === 200) {
      onSuccess(result);
      onClose();
      showToast({
        type: "success",
        title: t("placeManage.toastSuccess"),
      });
    } else {
      showToast({
        type: "error",
        title: t("placeManage.toastError"),
      });
    }
  };

  return (
    <Modal
      title={t("placeManage.editPlace")}
      onClose={onClose}
      onSubmit={submitHandler}
      overflow
      className="max-w-2xl">
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
      <Textarea
        label={t("placeManage.labels.description")}
        name="description"
        value={formData.description || ""}
        onChange={handleChange}
        placeholder={t("placeManage.place.placeholder.description")}
        rows={6}
        required
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
      <div>
        <InputField
          label={t("placeManage.labels.image")}
          type="file"
          accept="image/*"
          name="imges_url"
          onChange={handleChange}
        />
        {previewUrl && (
          <Image
            width={250}
            height={50}
            src={previewUrl}
            alt="preview"
            className="max-w-full mt-2 h-40 object-cover rounded-md"
          />
        )}
      </div>

      <Select
        label={t("placeManage.labels.type") || "Type"}
        name="type"
        value={formData.type || "historical"}
        onChange={handleChange}
        options={[
          {
            value: "historical",
            label: t("placeManage.types.historical") || "Historical",
          },
          {
            value: "entertainment",
            label: t("placeManage.types.entertainment") || "Entertainment",
          },
          {
            value: "service",
            label: t("placeManage.types.service") || "Service",
          },
        ]}
        required
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

export default EditPlaceModal;
