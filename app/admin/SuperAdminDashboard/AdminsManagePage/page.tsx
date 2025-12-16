"use client";

import React, { useCallback, useEffect, useState } from "react";
import TableManager from "../Components/TableManager";
import TableSkeleton from "../Components/TableSkeleton";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Admin, getAdmins } from "@/libs/getAdmins";
import AddAdminModal from "../Components/AddAdminModal";
import { deleteAdmin } from "@/libs/admin";
import { useToast } from "@/Components/Toast/useToast";

const AddAdminPage = () => {
  const t = useTranslations();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const { showToast } = useToast();

  const fetchAdmins = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAdmins();
      setAdmins(data || []);
    } catch (error) {
      showToast({
        title: t("errorMessages.failedToLoadAdmins"),
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [showToast, t]);

  const handleDelete = (adminId: number) => {
    showToast({
      title: t("confirmMessages.deleteAdmin"),
      type: "confirm",
      onConfirm: async () => {
        const success = await deleteAdmin(adminId);
        if (success) {
          await fetchAdmins();
          showToast({ title: t("adminManage.adminDeleted"), type: "success" });
        } else {
          showToast({ title: t("adminManage.deleteFailed"), type: "error" });
        }
      },
    });
  };

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);
  console.log(admins);
  if (loading) {
    return <TableSkeleton columns={2} hasActions={true} hasAddButton={true} />;
  }

  return (
    <>
      <TableManager
        title={t("adminManage.title")}
        data={admins}
        columns={[
          {
            header: t("id"),
            accessor: (admin: Admin) =>
              admin?.admin_id?.toString() ||
              admin?.admin?.admin_id?.toString() ||
              "",
          },
          {
            header: t("adminManage.labels.adminName"),
            accessor: (admin: Admin) =>
              admin?.username || admin?.admin?.username || "",
          },
        ]}
        actions={[
          {
            icon: <Trash2 />,
            onClick: (admin: Admin) => {
              const adminId = admin?.admin_id || admin?.admin?.admin_id;
              if (adminId) {
                handleDelete(Number(adminId));
              }
            },
            variant: "danger",
          },
        ]}
        addButton={{
          text: t("adminManage.actions.addAdmin"),
          onClick: () => setShowAddModal(true),
        }}
      />

      {showAddModal && (
        <AddAdminModal
          onClose={() => setShowAddModal(false)}
          onSuccess={fetchAdmins}
        />
      )}
    </>
  );
};

export default AddAdminPage;
