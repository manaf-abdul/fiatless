import axiosInstance from "@/utils/axios";

export const LoginUserData:any = async (email: string, password: string) => {
   console.log(email, password);

   const bodyFormData = { email: email, password: password };
   return await axiosInstance.post(`/auth/signin`, bodyFormData);

};

