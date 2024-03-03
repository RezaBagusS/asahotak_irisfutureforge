"use client";

import CustTagModule from "../components/atoms/custTagModule";
import CustSettingFields from "../components/atoms/custSettingFields";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import CustErrorField from "../components/atoms/custErrorField";
import CustButtonMenuMobile from "../components/atoms/custButtonMenuMobile";
import FooterModule from "../components/molecules/footerModule";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setPopup } from "../redux/slices/reduxPopUpSlices";
import { setUserData } from "../redux/slices/reduxUserDataSlices";
import { updateProfileHandle } from "../helpers/updateProfile";

interface PageProps {}

const schema = z.object({
  email: z.string().email(),
  username: z.string().min(4),
  password: z.string().min(8),
});

type Form = z.infer<typeof schema>;

export default function Page({}: PageProps) {

  const dispatch = useDispatch()
  const route = useRouter()

  useEffect(() => {
    const getActiveUser = () => {
      const expirationTime = localStorage.getItem("asahOtak_EP728");

      const hasToken =
        localStorage.getItem("asahOtak_TN903") &&
        localStorage.getItem("asahOtak_UD348") &&
        expirationTime !== null &&
        Date.now() < Number(expirationTime) * 1000;

      return hasToken;
    };

    !getActiveUser() &&
      dispatch(
        setPopup({
          title: "Session Expired",
          message: "Please login again",
          show: true,
          type: "warning",
          onConfirm: () => route.push("/auth/login"),
        })
      );

      const getUser = () => {
        if (localStorage.getItem("asahOtak_TN903") == null) {
          return {};
        } else if (
          Date.now() >
          parseInt(localStorage.getItem("asahOtak_EP728") || "0") * 1000
        ) {
          alert("Your session is expired. Please login again.");
          localStorage.clear();
          return {};
        } else {
          try {
            let decoded = atob(localStorage.getItem("asahOtak_UD348") || "");
            return JSON.parse(decoded);
          } catch (e) {
            return {};
          }
        }
      };

      dispatch(setUserData(getUser()));

  },[])

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const user = useSelector((state:any) => state.userData.data)

  const onSubmit: SubmitHandler<Form> = async (data) => {

    // let res = await updateProfileHandle({ data })

    // if (res.error) {
    //   dispatch(setPopup({
    //     title: "Failed",
    //     message: res.message || "Update Profile Failed",
    //     show: true,
    //     type: "warning",
    //     onConfirm: () => {
    //       dispatch(setPopup({
    //         show: false,
    //       }));
    //     }
    //   }));
    // } else {
    //   dispatch(setPopup({
    //     title: "Success",
    //     message: "Update Profile Success, please login again!!",
    //     show: true,
    //     type: "success",
    //     onConfirm: () => {
    //       route.push("/auth/login");
    //       dispatch(setPopup({
    //         show: false,
    //       }));
    //     }
    //   }));
    // }

    // Handle form submission here
    console.log("data : ", data);
    console.log("error : ", errors);
    console.log("isSubmitting : ", isSubmitting);
  };

  return (
    <div className="w-full relative">
      <div className="flex items-center gap-5">
        <div className="flex md:hidden">
          <CustButtonMenuMobile />
        </div>
        <CustTagModule
          text="Setting"
          desc="This is how others will see you on the site."
        />
      </div>
      <form
        className="pt-6 flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* UsernameFields */}
        <div className="flex flex-col gap-2">
          <CustSettingFields
            regist={register}
            label="Username"
            text={user.username}
            desc="This is your public display name. It can be your real name or a pseudonym."
            type="text"
          />
          {errors.username && (
            <CustErrorField message={errors.username.message} />
          )}
        </div>
        {/* emailFields */}
        <div className="flex flex-col gap-2">
          <CustSettingFields
            regist={register}
            label="Email"
            text={user.email}
            desc="You can manage verified email addresses in your email settings."
            type="email"
          />
          {errors.email && <CustErrorField message={errors.email.message} />}
        </div>
        {/* passwordFields */}
        <div className="flex flex-col gap-2">
          <CustSettingFields
            regist={register}
            label="Password"
            desc="Input your new password on his field."
            type="password"
          />
          {errors.password && (
            <CustErrorField message={errors.password.message} />
          )}
        </div>
        <button
          className="bg-custPrimary mt-4 w-fit text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-150 hover:bg-custPrimary/70 hover:text-white"
          type="submit"
        >
          Save Changes
        </button>
      </form>
      <div className="mt-5">
        <FooterModule />
      </div>
    </div>
  );
}
