const BannerTryout = () => {
  return (
    <div className="w-full rounded-md text-custBlack bg-slate-100 px-3 py-5">
      <p className="text-gray-500 text-center text-xs md:text-sm">
        Please activate the token in the column below to start tryout.
      </p>
      <div className="flex gap-3 mt-3 justify-center">
        <input type="text" className="px-4 py-2 w-6/12 text-xs md:text-sm border text-gray-600 font-semibold" placeholder="Input your token" />
        <button className="px-4 py-2 bg-custPrimary text-xs md:text-sm text-custWhite">Activate</button>
      </div>
    </div>
  );
};

export default BannerTryout;
