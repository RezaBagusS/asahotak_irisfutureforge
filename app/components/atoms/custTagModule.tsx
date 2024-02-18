interface CustTagModuleProps {
  text: string;
  desc: string;
}

const CustTagModule = ({ text, desc }: CustTagModuleProps) => {
  return (
    <div className="pb-3 border-b">
      <span className="text-4xl font-semibold text-custPrimary">{text}</span>
      <p className="text-custBlack/70">{desc}</p>
    </div>
  );
};

export default CustTagModule;
