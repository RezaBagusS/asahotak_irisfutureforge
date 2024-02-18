"use client";

import CustTagModule from "../components/atoms/custTagModule";
import CustSettingFields from "../components/atoms/custSettingFields";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import CustErrorField from "../components/atoms/custErrorField";

interface PageProps {}

const schema = z.object({
  email: z.string().email(),
  username: z.string().min(4),
  password: z.string().min(8),
});

type Form = z.infer<typeof schema>;

export default function Page({}: PageProps) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Form> = async (data) => {
    // Handle form submission here
    console.log("data : ", data);
    console.log("error : ", errors);
    console.log("isSubmitting : ", isSubmitting);
  };

  return (
    <div className="w-full relative">
      <CustTagModule
        text="Setting"
        desc="This is how others will see you on the site."
      />
      <form
        className="pt-6 flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* UsernameFields */}
        <div className="flex flex-col gap-2">
          <CustSettingFields
            regist={register}
            label="Username"
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
            desc="Manage your password account."
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
    </div>
  );
}
