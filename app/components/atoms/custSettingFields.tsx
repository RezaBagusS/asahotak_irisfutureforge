import React from "react";

interface CustSettingFieldProps {
  text?: string;
  label: string;
  desc: string;
  type: string;
  regist?: any
}

const CustSettingFields = (({ label, desc, text, type, regist }: CustSettingFieldProps) => {

  const lowerLabel = label.toLowerCase();

  return (
    <div className="text-custBlack flex flex-col gap-1">
      <label className="font-semibold text-base mb-1">{label}</label>
      <input
        {...regist(lowerLabel)}
        type={type}
        defaultValue={text}
        className="text-sm px-3 py-2 text-custBlack/70 rounded-md border active:outline-none focus:outline-none focus:border-custBlack/70 font-semibold"
      />
      <p className="text-sm text-custBlack/50">{desc}</p>
    </div>
  );
});

export default CustSettingFields;
