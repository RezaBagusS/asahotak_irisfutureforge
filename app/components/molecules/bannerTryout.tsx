import { matchVoucher } from "@/app/helpers/voucher";
import { setPopup } from "@/app/redux/slices/reduxPopUpSlices";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RiLoader3Line } from "react-icons/ri";

const BannerTryout = () => {

  const { handleSubmit , register, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const dispacth = useDispatch();

  const toggleLoading = () => {
    setLoading(prev => !prev);
  }

  const userData:any = useSelector((state: any) => state.userData.data);

  const onSubmit = async (data: any) => {
    toggleLoading();
    
    const getAccessVoucher = await matchVoucher(userData.id, data.kode_voucher);

    console.log("Get Access Voucher : ", getAccessVoucher);

    if (getAccessVoucher.error) {
      dispacth(setPopup({
        show: true,
        type: "warning",
        title: "Warning",
        message: getAccessVoucher.message,
        onConfirm: () => {
          dispacth(setPopup({ show: false }));
          toggleLoading();
        }
      }));
    } else {
      dispacth(setPopup({
        show: true,
        type: "success",
        title: "Success",
        message: getAccessVoucher.message,
        onConfirm: () => {
          dispacth(setPopup({ show: false }));
          toggleLoading();
          reset();
          window.location.reload();
        }
      }));
    }


  }

  return (
    <div className="w-full rounded-md text-custBlack bg-slate-100 px-3 py-5">
      <p className="text-gray-500 text-center text-xs md:text-sm">
        Please activate the token in the column below to start tryout.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 mt-3 justify-center">
        <input {...register("kode_voucher")} autoComplete="none" type="text" className="px-4 py-2 w-6/12 text-xs md:text-sm border text-gray-600 font-semibold" placeholder="Input your token" />
        <button 
        disabled={loading}
        className="flex gap-1 items-center px-4 py-2 disabled:cursor-not-allowed disabled:bg-slate-500 bg-custPrimary text-xs md:text-sm text-custWhite">
          <RiLoader3Line className={`animate-spin ${loading ? "block" : "hidden"} text-sm`} />
          Activate
        </button>
      </form>
    </div>
  );
};

export default BannerTryout;
