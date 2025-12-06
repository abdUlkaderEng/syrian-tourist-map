"use client";
import { useState, useEffect } from "react";
import { Place } from "@/libs/getPlaces";

interface UsePlaceFormProps {
  place?: Place | null;
  // onSubmit يستقبل FormData فقط
  onSubmit: (form: FormData) => Promise<any>;
}

export function usePlaceForm({ place, onSubmit }: UsePlaceFormProps) {
  const [formData, setFormData] = useState<Partial<Place>>({
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    location_ar: "",
    location_en: "",
    google_map_url: "",
    region_id: 0,
    image_url: undefined,
    type: "historical",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Edit case
  useEffect(() => {
    console.log(place)
    if (place) {
      setFormData({
        name_ar: place.name_ar,
        name_en: place.name_en,
        description_ar: place.description_ar,
        description_en: place.description_en,
        location_ar: place.location_ar,
        location_en: place.location_en,
        google_map_url: place.google_map_url,
        region_id: place.region_id,
        image_url: place.image_url,
        type: place.type,
      });
    }
  }, [place]);

  // Clean preview
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

    if (target instanceof HTMLInputElement && target.type === "file") {
      const file = target.files?.[0] || null;
      setImageFile(file);
      setPreviewUrl(file ? URL.createObjectURL(file) : null);
      return;
    }

    setFormData(prev => ({
      ...prev,
      [target.name]:
        target.name === "region_id"
          ? parseInt(target.value)
          : target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData();

    // append كل الداتا العادية
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        form.append(key, String(value));
      }
    });

    // append الصورة
    if (imageFile) {
      form.append("image_url", imageFile);
    }

    // Send to hook caller
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
