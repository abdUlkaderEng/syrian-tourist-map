"use client";
import React, {  useEffect, useState } from "react";
import { getPlaces, Place } from "@/libs/getPlaces";
import { deletePlace } from "@/libs/admin";
import { PenBox, Plus, Trash2 } from "lucide-react";
import EditPlaceModal from "../Components/EditPlaceModal";
import AddPlaceModal from "../Components/AddPlaceModal";
import Button from "@/Components/Form/Button";
import { useTranslations } from "next-intl";
import { useToast } from "@/Components/Toast/useToast";
import { set } from "zod";
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
  const [confirm,setConfirm]=useState(false);
  useEffect(() => {
    getPlaces("", "super")
      .then(setPlaces)
      .catch(() => setError("Failed to load places"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id?: number) => {
  if (!id) return;

  showToast({
    title: t("confirmMessages.deletePlace"),
    type: "confirm",
    onConfirm: async () => {
      const success = await deletePlace(id);

      if (success) {
        setPlaces(prev => ({
          ...prev,
          data: prev.data.filter(p => p.place_id !== id),
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
      <div className="max-w-5xl mx-auto p-6">
          <h1 className="text-3xl  mb-3  font-semibold text-gray-800">
            {t("place.places")}
          </h1>

        <div className=" overflow-hidden border   glass">
          <table className="w-full text-center">
            <thead>
              <tr className="">
                <th className="p-4 ">{t("place.placeName")}</th>
                <th className="p-4 ">{t("place.placeLocation")}</th>
                <th className="p-4">
                  <Button
            onClick={() => setShowAddModal(true)}
            fullWidth={false}
            className="btn-normal text-sm shadow-none "
            variant="secondary">
            {t("place.addPlace")}
            <Plus className="ml-2" />
          </Button>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
          

              </tr>
              {places.data.map((place) => (
                <tr key={place.place_id} className="border-b border-[#e4bc75]">
                  <td className="p-4 text-gray-900 border-l border-[#e4bc75]">
                    {place.name}
                  </td>
                  <td className="p-4  text-gray-600  ">{place.location}</td>
                  <td className="p-4 flex gap-3 justify-end">
                    <button
                      onClick={() => setSelectedPlace(place)}
                      className=" btn-normal   ">
                      <PenBox />
                    </button>
                    <button
                      onClick={() => handleDelete(place.place_id)}
                      className="btn-danger">
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      <EditPlaceModal
        place={selectedPlace}
        onClose={() => setSelectedPlace(null)}
        onSuccess={handleEditSuccess}
      />
      {/* Add Modal (render only when requested) */}
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

