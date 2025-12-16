"use client";
import React, { useEffect, useState } from "react";
import {
  getManagingPlaces,
  PlaceFromBackend,
} from "@/libs/getPlaces";
import { useLocale } from "@/app/Providers/LocaleContext";
import { deletePlace } from "@/libs/admin";
import { PenBox, Trash2 } from "lucide-react";
import EditPlaceModal from "../Components/EditPlaceModal";
import AddPlaceModal from "../Components/AddPlaceModal";
import { useTranslations } from "next-intl";
import { useToast } from "@/Components/Toast/useToast";
import TableManager from "../Components/TableManager";
const ManagePlacesPage = () => {
  const [places, setPlaces] = useState<{ data: PlaceFromBackend[] }>({
    data: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<PlaceFromBackend | null>(
    null
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const t = useTranslations();
  const { showToast } = useToast();
  const { locale } = useLocale();

  useEffect(() => {
    getManagingPlaces()
      .then((res) => setPlaces({ data: res }))
      .catch(() => setError("Failed to load places"))
      .finally(() => setLoading(false));
  }, [locale]);
  const Places2 = getManagingPlaces();
  console.log("places2:", Places2);
  const handleDelete = (id?: number) => {
    if (!id) return;

    showToast({
      title: t("confirmMessages.deletePlace"),
      type: "confirm",
      onConfirm: async () => {
        const success = await deletePlace(id);

        if (success) {
          setPlaces((prev) => ({
            ...prev,
            data: prev.data.filter((p) => p.id !== id),
          }));

          showToast({ title: t("placeManage.placeDeleted"), type: "success" });
        } else {
          showToast({ title: t("placeManage.deleteFailed"), type: "error" });
        }
      },
    });
  };

  const handleEditSuccess = (updatedPlace: PlaceFromBackend) => {
    setPlaces((prev) => ({
      ...prev,
      data: prev.data.map((p) => (p.id === updatedPlace.id ? updatedPlace : p)),
    }));
    setSelectedPlace(null);
  };

  if (loading)
    return (
      <div className="text-center py-10 text-gray-600">Loading places...</div>
    );
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  console.log("Places:", places.data);
  const mappedPlaces = places.data.map((p) => {
    const translations = p.translations || []; 
    const ar = translations.find((t) => t.locale === "ar");
    const en = translations.find((t) => t.locale === "en");

    return {
      ...p,
      name_ar: ar?.name ,
      name_en:en?.name,
      location_ar: ar?.location,
      location_en: en?.location,
    };
  });
  console.log("Mapped Place", mappedPlaces);

  return (
    <>
      <TableManager
        title={t("place.places")}
        data={mappedPlaces}
        columns={[
          { header: t("placeManage.labels.name_ar"), accessor: "name_ar" },
          { header: t("placeManage.labels.name_en"), accessor: "name_en" },
          { header: t("placeManage.labels.location_ar"), accessor: "location_ar" },
          { header: t("placeManage.labels.location_en"), accessor: "location_en" },
        ]}
        actions={[
          {
            icon: <PenBox />,
            onClick: (place) => setSelectedPlace(place),
            variant: "normal",
          },
          {
            icon: <Trash2 />,
            onClick: (place) => handleDelete(place.id),
            variant: "danger",
          },
        ]}
        addButton={{
          text: t("place.addPlace"),
          onClick: () => setShowAddModal(true),
        }}
      />
      <EditPlaceModal
        place={selectedPlace}
        onClose={() => setSelectedPlace(null)}
        onSuccess={handleEditSuccess}
      />
      {showAddModal && (
        <AddPlaceModal
          onClose={() => setShowAddModal(false)}
          onSuccess={(newPlace: PlaceFromBackend) => {
            setPlaces((prev) => ({ ...prev, data: [newPlace, ...prev.data] }));
            setShowAddModal(false);
          }}
        />
      )}
    </>
  );
};

export default ManagePlacesPage;
