const CustButton = ({
    text="",
    action="",
    disabled=false,
}) => {
  return (
    <button type="submit" disabled={disabled} className="bg-custPrimary text-white text-sm font-medium md:text-lg rounded-md py-3 px-4 active:outline-none focus:outline-none">
        {text}
    </button>
  )
};

export default CustButton;