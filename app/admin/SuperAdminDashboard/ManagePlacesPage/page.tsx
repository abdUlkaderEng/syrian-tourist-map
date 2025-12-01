"use client";
import React, { useEffect, useState } from "react";
import { getPlaces, Place } from "@/libs/getPlaces";
import { deletePlace } from "@/libs/admin";
import Link from "next/link";
import { PenBox, Trash2 } from "lucide-react";
import EditPlaceModal from "../Components/EditPlaceModal";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { useTranslations } from "next-intl";
const ManagePlacesPage = () => {
  const [places, setPlaces] = useState<{data:Place[],error:string}>({data:[],error:''});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const t = useTranslations();  
  useEffect(() => {
    getPlaces("", 'super')
      .then(setPlaces)
      .catch(() => setError("Failed to load places"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this place?")) return;
    const success = await deletePlace(id);
    if (success) setPlaces((prev) => 
    ({...prev,
      data: prev.data.filter((p) => p.place_id !== id)
    }))
      else alert("Failed to delete place");
  };

  const handleEditSuccess = (updatedPlace: Place) => {
    setPlaces((prev) =>
    ({
      ...prev,
      data: prev.data.map((p) => (p.place_id === updatedPlace.place_id ? updatedPlace : p))
    })
    );
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">{t("place.places")}</h1>
          <Link
            href="/admin/SuperAdminDashboard/AddPlacePage"
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition shadow-sm">
            {t("place.addPlace")}
          </Link>
        </div>

        <div className=" overflow-hidden border   glass">
          <table className="w-full text-center">
            <thead>
              <tr className="">
                <th className="p-4 ">{t("place.placeName")}</th>
                <th className="p-4 ">{t("place.placeLocation")}</th>
                <th className="p-4"></th>
              </tr>
            </thead>

            <tbody>
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
    </>
  );
};

export default ManagePlacesPage;
