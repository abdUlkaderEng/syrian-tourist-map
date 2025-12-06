"use client";
import React, { useEffect, useState } from "react";
import { getPlaces, Place } from "@/libs/getPlaces";
import { useLocale } from "@/app/Providers/LocaleContext";
import { deletePlace } from "@/libs/admin";
import { PenBox, Plus, Trash2 } from "lucide-react";
import EditPlaceModal from "../Components/EditPlaceModal";
import AddPlaceModal from "../Components/AddPlaceModal";
import Button from "@/Components/Form/Button";
import { useTranslations } from "next-intl";
import { useToast } from "@/Components/Toast/useToast";
import { set } from "zod";
import TableManager from "../Components/TableManager";
const ManagePlacesPage = () => {
  const [places, setPlaces] = useState<{ data: Place[]; error: string }>({
    data: [],
    error: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const t = useTranslations();
  const { showToast } = useToast();
  const [confirm, setConfirm] = useState(false);
  const { locale } = useLocale();

  useEffect(() => {
    getPlaces("", "super", locale)
      .then(setPlaces)
      .catch(() => setError("Failed to load places"))
      .finally(() => setLoading(false));
  }, [locale]);

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
            data: prev.data.filter((p) => p.place_id !== id),
          }));

          showToast({ title: t("placeManage.placeDeleted"), type: "success" });
        } else {
          showToast({ title: t("placeManage.deleteFailed"), type: "error" });
        }
      },
    });
  };

  const handleEditSuccess = (updatedPlace: Place) => {
    setPlaces((prev) => ({
      ...prev,
      data: prev.data.map((p) =>
        p.place_id === updatedPlace.place_id ? updatedPlace : p
      ),
    }));
    setSelectedPlace(null);
  };

  if (loading)
    return (
      <div className="text-center py-10 text-gray-600">Loading places...</div>
    );
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <>
      <TableManager
        title={t("place.places")}
        data={places.data}
        columns={[
          { header: t("place.placeName"), accessor: "name" },
          { header: t("place.placeLocation"), accessor: "location" },
        ]}
        actions={[
          {
            icon: <PenBox />,
            onClick: (place) => setSelectedPlace(place),
            variant: "normal",
          },
          {
            icon: <Trash2 />,
            onClick: (place) => handleDelete(place.place_id),
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
          onSuccess={(newPlace: Place) => {
            setPlaces((prev) => ({ ...prev, data: [newPlace, ...prev.data] }));
            setShowAddModal(false);
          }}
        />
      )}
    </>
  );
};

export default ManagePlacesPage;
