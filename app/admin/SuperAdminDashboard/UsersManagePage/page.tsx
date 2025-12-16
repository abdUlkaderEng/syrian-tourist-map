"use client";
import { getUsers, User } from "@/libs/getUsers";
import React, { useCallback, useEffect, useState } from "react";
import TableManager from "../Components/TableManager";
import TableSkeleton from "../Components/TableSkeleton";
import { useTranslations } from "next-intl";
import { Trash2 } from "lucide-react";
import { deleteUser } from "@/libs/admin";
import { useToast } from "@/Components/Toast/useToast";

const UsersManagePage = () => {
  const t = useTranslations();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data || []);
    } catch (error) {
      showToast({ title: t("errorMessages.failedToLoadUsers"), type: "error" });
    } finally {
      setLoading(false);
    }
  }, [showToast, t]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = (userID: number) => {
    showToast({
      title: t("confirmMessages.deleteUser"),
      type: "confirm",
      onConfirm: async () => {
        const success = await deleteUser(userID);
        if (success) {
          fetchUsers();
          showToast({ title: t("usersManage.userDeleted"), type: "success" });
        } else {
          showToast({ title: t("usersManage.deleteFailed"), type: "error" });
        }
      },
    });
  };
  if (loading) {
    return <TableSkeleton columns={3} hasActions={true} />;
  }

  return (
    <TableManager
      title={t("usersManage.title")}
      data={users}
      columns={[
        { header: t("id"), accessor: (user) => user.id },
        { header: t("usersManage.username"), accessor: (user) => user.name },
        { header: t("usersManage.email"), accessor: (user) => user.email },
      ]}
      actions={[
        {
          icon: <Trash2 />,
          onClick: (user) => handleDelete(Number(user.id)),
          variant: "danger",
        },
      ]}
    />
  );
};

export default UsersManagePage;
