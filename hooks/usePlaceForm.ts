
"use client";
import { useState, useEffect } from "react";
import { PlaceFromBackend } from "@/libs/getPlaces";

interface UsePlaceFormProps {
  place?: PlaceFromBackend | null;
  onSubmit: (form: FormData) => Promise<any>;
}

export function usePlaceForm({ place, onSubmit }: UsePlaceFormProps) {
  const [formData, setFormData] = useState<any>({
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    location_ar: "",
    location_en: "",
    google_map_url: "",
    region_id: "",
    type: "historical",
    image_url: null,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fill formData from backend on edit
  useEffect(() => {
    if (place) {
      const ar = place.translations.find((t) => t.locale === "ar");
      const en = place.translations.find((t) => t.locale === "en");

  
      setFormData({
        name_ar: ar?.name || "",
        name_en: en?.name || "",
        description_ar: ar?.description || "",
        description_en: en?.description || "",
        location_ar: ar?.location || "",
        location_en: en?.location || "",
        google_map_url: place.google_map_url || "",
        region_id: place.region_id || "",
        type: place.type || "historical",
        image_url: place.image_url, // للعرض فقط
      });

      setPreviewUrl(place.image_url || null);
    }
  }, [place]);

  // clean preview
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;

    if (
      target instanceof HTMLInputElement &&
      target.type === "file"
    ) {
      const file = target.files?.[0] || null;
      setImageFile(file);
      setPreviewUrl(file ? URL.createObjectURL(file) : null);
      return;
    }

    setFormData((prev: any) => ({
      ...prev,
      [target.name]:
        target.name === "region_id" ? Number(target.value) : target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData();

    const translations = [
    {
      locale: "ar",
      name: formData.name_ar,
      description: formData.description_ar,
      location: formData.location_ar,
    },
    {
      locale: "en",
      name: formData.name_en,
      description: formData.description_en,
      location: formData.location_en,
    },
  ];


    // append translations
    form.append("translations", JSON.stringify(translations));
    form.append("name_ar", formData.name_ar);
    form.append("name_en", formData.name_en);
    form.append("description_ar", formData.description_ar);
    form.append("description_en", formData.description_en);
    form.append("location_ar", formData.location_ar);
    form.append("location_en", formData.location_en);

    // append other fields
    form.append("google_map_url", formData.google_map_url);
    form.append("region_id", String(formData.region_id));
    form.append("type", formData.type);

    // image
    if (imageFile) {
      form.append("image_url", imageFile);
    }

    const result = await onSubmit(form).catch(() => null);

    if (!result) {
      setError("Something went wrong");
    }

    setLoading(false);
    return result;
  };

  return {
    formData,
    imageFile,
    previewUrl,
    loading,
    error,
    handleChange,
    handleSubmit,
    setError,
  };
}
