// "use client"
// import InputField from '@/Components/Form/InputField'
// import Modal from '@/Components/Modal/Modal'
// import { useTranslations } from 'next-intl'
// import React from 'react'

// const AddAdminModal = () => {
//     const t = useTranslations()
//   return (
//    <Modal
//          title={t("adminManage.actions.addAdmin")}
//          onClose={onClose}
//          onSubmit={submitHandler}
//          overflow>
//          <InputField
//            type="text"
//            name="email"
//            label={t("placeManage.labels.name_ar")}
//            value={formData.email || ""}
//            onChange={handleChange}
//            placeholder={t("placeManage.place.placeholder.name_ar")}
//            required
//          />
//          <InputField
//            type="password"
//            name="password"
//            label={t("placeManage.labels.name_ar")}
//            value={formData.password || ""}
//            onChange={handleChange}
//            placeholder={t("placeManage.place.placeholder.name_ar")}
//            required
//          />
//       </Modal> 
//   )
// }

// export default AddAdminModal








"use client";

import InputField from "@/Components/Form/InputField";
import Modal from "@/Components/Modal/Modal";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useToast } from "@/Components/Toast/useToast";
import { addAdmin } from "@/libs/admin";
import Button from "@/Components/Form/Button";
import { useAuthStore } from "@/hooks/Auth/authStore";

const AddAdminModal = ({ onClose, onSuccess }) => {
  const t = useTranslations();
  const superadminID = useAuthStore((state) => state.id);
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmpassword: "",

  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async () => {
    const fd = new FormData();
    
    fd.append("super_admin_id", superadminID.toString());
    fd.append("username", formData.username);
    fd.append("password", formData.password);
    fd.append("password_confirmation", formData.confirmpassword);
    
    const res = await addAdmin(fd);

    if (res?.status === 201) {
      showToast({
        type: "success",
        title: t("adminManage.messages.addSuccess"),
      });
      onSuccess();
      onClose();
      return;
    }

    showToast({
      type: "error",
      title: t("adminManage.messages.addFailed"),
    });
  };

  return (
    <Modal
      title={t("adminManage.actions.addAdmin")}
      onClose={onClose}
      onSubmit={submitHandler} 
      overflow
    >
      <InputField
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder={t("adminManage.labels.adminName")}
        required
      />

      <InputField
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder={t("adminManage.labels.adminPassword")}
        required
      />
      <InputField
        type="password"
        name="confirmpassword"
        value={formData.confirmpassword}
        onChange={handleChange}
        placeholder={t("adminManage.labels.adminConfirmPassword")}
        required
      />

      <div className="mt-4 flex justify-end">
        <Button type="button" onClick={submitHandler}>
          {t("adminManage.actions.addAdmin")}
        </Button>
      </div>
    </Modal>
  );
};

export default AddAdminModal;
