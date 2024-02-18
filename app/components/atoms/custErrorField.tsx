interface CustErrorFieldProps {
    message: any;
}

const CustErrorField = ({ message }: CustErrorFieldProps) => {
  return <p className="text-xs text-red-600">*{message}</p>;
};

export default CustErrorField;
