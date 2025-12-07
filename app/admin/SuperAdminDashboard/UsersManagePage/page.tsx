"use client";
import { getUsers, User } from "@/libs/getUsers";
import React, { useEffect, useState } from "react";
import TableManager from "../Components/TableManager";
import { useTranslations } from "next-intl";
import { Trash2 } from "lucide-react";
import { deleteUser } from "@/libs/admin";

const UsersManagePage = () => {
    const t = useTranslations()
    const [users, setUsers] = useState<User[]>([]);
  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data || []);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userID: number) => {
      await deleteUser(userID);
      fetchUsers();
    };
  return (
    <TableManager
      title={t("usersManage.title")}
      data={users}
      columns={[
        { header: t("id"), accessor: "id" },
        { header: t("usersManage.username"), accessor: "name" },
        { header: t("usersManage.email"), accessor: "email" },
      ]}
      actions={[
        {
          icon: <Trash2 />,
          onClick: (user) => handleDelete(user.user.id),
          variant: "danger",
        },
      ]}
 
    />
  );
};

export default UsersManagePage;
