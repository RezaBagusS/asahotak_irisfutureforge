'use client'

import Image from "next/image";
import AOBlue from "../../assets/AOBlue.png";
import CustInput from "../../components/atoms/custInput";
import CustButton from "../../components/atoms/custButton";
import CustErrorField from "../../components/atoms/custErrorField";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { loginHandler } from "@/app/helpers/loginHandler";
import { useDispatch } from "react-redux";
import { setPopup } from "@/app/redux/slices/reduxPopUpSlices";
import { useRouter } from "next/navigation";
import { setLocalStorage } from "@/app/helpers/localStorage";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });
  
  type Form = z.infer<typeof schema>;

const FormLogin = () => {

    const [checkbox, setCheckbox] = useState(false);
  const dispatch = useDispatch();
  const location = useRouter();

  useEffect(() => {
    dispatch(setPopup({
      show: false,
    }))
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const handleCheckbox = () => {
    setCheckbox((prev) => !prev);
  };

  const onSubmit: SubmitHandler<Form> = async (data) => {
    
    dispatch(setPopup({
      title: "Loading",
      message: "Waiting for login...",
      show: true,
    }));

    let res = await loginHandler({
      data,
    })

    console.log("Res : ", res);
    

    // if (res.error) {
    //   dispatch(setPopup({
    //     title: "Failed",
    //     message: res.message || "Login Failed",
    //     show: true,
    //     type: "warning",
    //     onConfirm: () => {
    //       dispatch(setPopup({
    //         show: false,
    //       }));
    //     }
    //   }));
    // } else {
    //   setTimeout(() => {
    //     setLocalStorage(res.data.payload, res.data.accessToken)
    //     dispatch(setPopup({
    //       title: "Success",
    //       message: "Login Success",
    //       show: true,
    //       type: "success",
    //       onConfirm: () => {
    //         location.push("/dashboard");
    //         dispatch(setPopup({
    //           show: true,
    //           message: "Redirecting to dashboard...",
    //         }));
    //       }
    //     }));
    //   }, 500);
    // }
  };

    return (
        <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full lg:w-5/12 bg-white text-black flex flex-col justify-center"
      >
        <div className="w-9/12 flex flex-col gap-10 mx-auto font-nunitoSans">
          <div className="flex lg:hidden justify-center">
            <Image src={AOBlue} alt="AOLogo" priority height={60} />
          </div>
          <div className="flex flex-col items-center lg:items-start gap-3">
            <h1 className="text-4xl md:text-6xl font-semibold md:font-medium">
              Welcome!
            </h1>
            <p className="text-base md:text-lg">Log in to your account</p>
          </div>
          <div className="flex flex-col gap-2 md:gap-4">

            {/* EMAIL / USERNAME */}
            <div className="flex flex-col gap-2">
              <CustInput
                type="text"
                label="Email"
                regist={register}
                placeholder="ahmadzuki@gmail.com"
                />
              {errors.email && (
                <CustErrorField message={errors.email.message} />
                )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <CustInput
                type="password"
                label="Password"
                regist={register}
                placeholder="xxxxxxx"
              />
              {errors.password && (
                <CustErrorField message={errors.password.message} />
              )}
            </div>

            {/* Remember me */}
            <div className="flex justify-between items-center">
              <div
                onClick={handleCheckbox}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="checkbox"
                  checked={checkbox}
                  readOnly
                  className="pointer-events-none"
                />
                <p className="text-xs md:text-base whitespace-nowrap">
                  Remember me
                </p>
              </div>
              <p className="text-[#5E9EFF] cursor-pointer text-xs md:text-base">
                Forgot password?
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <CustButton text="Login" />
            <p className="text-xs sm:text-sm text-center text-gray-600">
              If there are problems, contact CP immediately
            </p>
          </div>
        </div>
      </form>
    )
}

export default FormLogin;