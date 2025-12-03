import React from "react";
import z from "zod";

const AddAdminSchema = z.object({
  username: z.string().min(3, "اسم المستخدم يجب ان يكون اكثر من 3 حروف"),
  super_admin_id: z.number(),
  password: z.string().min(8, "كلمة المرور يجب ان تكون اكثر من 8 حروف"),
});
const AddAdminPage = () => {
  return <>
  <div>



  </div>
  </>;
};

export default AddAdminPage;
