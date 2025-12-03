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

  // useEffect(() => {
  //   if (place) {
  //     setFormData({
  //       name: place.name,
  //       description: place.description,
  //       location: place.location,
  //       google_map_url: place.google_map_url,
  //       region_id: place.region_id,
  //       image_url: place.image_url,
  //       type: place.type,
  //     });
  //   }
  // }, [place]);

  // Revoke preview URL when it changes or on unmount to avoid memory leaks
  // useEffect(() => {
  //   return () => {
  //     if (previewUrl) {
  //       URL.revokeObjectURL(previewUrl);
  //     }
  //   };
  // }, [previewUrl]);

  // const handleChange = (
  //   e: React.ChangeEvent<
  //     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  //   >
  // ) => {
  //   const target = e.target as HTMLInputElement;
  //   const { name } = target;

  //   // Handle file input separately
  //   if (target.type === "file") {
  //     const file = target.files && target.files.length ? target.files[0] : null;
  //     console.log("File selected:", file);
  //     setImageFile(file);
  //     if (file) {
  //       const url = URL.createObjectURL(file);
  //       setPreviewUrl(url);
  //     } else {
  //       setPreviewUrl(null);
  //     }
  //     return;
  //   }

  //   const value = (
  //     target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  //   ).value;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: name === "region_id" ? parseInt(value) : value,
  //   }));
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!place?.place_id) return;

  //   setLoading(true);
  //   setError("");

    // Always build FormData to include the image file
    // const form = new FormData();
    // if (formData.name) form.append("name", String(formData.name));
    // if (formData.description)
    //   form.append("description", String(formData.description));
    // if (formData.location) form.append("location", String(formData.location));
    // if (formData.google_map_url)
    //   form.append("google_map_url", String(formData.google_map_url));
    // if (formData.region_id !== undefined && formData.region_id !== null)
    //   form.append("region_id", String(formData.region_id));
    // if (formData.type) form.append("type", String(formData.type));

    // Append the image file if one was selected, otherwise keep existing image URL
    // if (imageFile) {
    //   form.append("image_url", imageFile);
    // } else if (formData.image_url) {
    //   form.append("image_url", String(formData.image_url));
    // }

    // Log FormData contents for debugging


  //   console.log("Form:",form);
  //   console.log("FormData contents:");
  //   for (const pair of form.entries()) {
  //     console.log(pair[0], pair[1]);
  //   }

  //   const result = await updatePlace(place.place_id, form);
  //   if (result) {
  //     onSuccess(result);
  //     onClose();
  //     showToast({
  //       title: t("placeManage.toastSuccess"),
  //       type: "success",
  //     });
  //   } else {
  //     setError(t("placeManage.toastError"));
  //     showToast({
  //       title: t("placeManage.toastError"),
  //       type: "error",
  //     });
  //   }
  //   setLoading(false);
  // };

  // if (!place) return null;

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
