// "use client";
// import React from "react";
// import z from "zod";
// import TableManager from "../Components/TableManager";
// import { Trash2 } from "lucide-react";
// import { useTranslations } from "next-intl";


// const AddAdminSchema = z.object({
//   username: z.string().min(3, "اسم المستخدم يجب ان يكون اكثر من 3 حروف"),
//   super_admin_id: z.number(),
//   password: z.string().min(8, "كلمة المرور يجب ان تكون اكثر من 8 حروف"),
// });
// const AddAdminPage = () => {
//   const t = useTranslations();

//   return (
//     <>
//       <div>
//         <TableManager
//           title={t("adminManage.title")}
//           data={[]}
//           columns={[
//             { header: t("id"), accessor: "id" },
//             { header: t("adminManage.adminName"), accessor: "name" },
//           ]}
//           actions={[
//             {
//               icon: <Trash2 />,
//               onClick: (place) => handleDelete(place.place_id),
//               variant: "danger",
//             },
//           ]}
//           addButton={{
//           text: t("adminManage.actions.addAdmin"),
//           onClick: () => setShowAddModal(true),
//         }}
//         />
//       </div>
//     </>
//   );
// };

// export default AddAdminPage;





















"use client";

import React, { useEffect, useState } from "react";
import z from "zod";
import TableManager from "../Components/TableManager";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Admin, getAdmins } from "@/libs/getAdmins";
import AddAdminModal from "../Components/AddAdminModal";
import { deleteAdmin } from "@/libs/admin";

const AddAdminSchema = z.object({
  username: z.string().min(3, "اسم المستخدم يجب ان يكون اكثر من 3 حروف"),
  super_admin_id: z.number(),
  password: z.string().min(8, "كلمة المرور يجب ان تكون اكثر من 8 حروف"),
});

const AddAdminPage = () => {
  const t = useTranslations();

  const [admins, setAdmins] = useState<Admin[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchAdmins = async () => {
    const data = await getAdmins();
    setAdmins(data || []);
  };

  const handleDelete = async (adminId: number) => {
    await deleteAdmin(adminId);
    fetchAdmins();
  };

  useEffect(() => {
    fetchAdmins();
  }, []);
  console.log(admins)
  return (
    <>
      <TableManager
        title={t("adminManage.title")}
        data={admins}
        columns={[
          { header: t("id"), accessor: "admin_id" },
          { header: t("adminManage.labels.adminName"), accessor: "username" },
        ]}
        actions={[
          {
            icon: <Trash2 />,
            onClick: (admin) => handleDelete(admin.admin.admin_id),
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
