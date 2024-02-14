const TryoutIcon = ({ fill = "black", width = 30, height = 30 }) => {
  const color = fill === "white" ? "white" : "#6D7C90";

  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.17992 2.50002C5.9505 3.02568 5.83247 3.59316 5.83325 4.16669C5.83325 4.60872 6.00885 5.03264 6.32141 5.3452C6.63397 5.65776 7.05789 5.83336 7.49992 5.83336H12.4999C12.9419 5.83336 13.3659 5.65776 13.6784 5.3452C13.991 5.03264 14.1666 4.60872 14.1666 4.16669C14.1666 3.57419 14.0433 3.01002 13.8199 2.50002H14.9999C15.4419 2.50002 15.8659 2.67562 16.1784 2.98818C16.491 3.30074 16.6666 3.72466 16.6666 4.16669V16.6667C16.6666 17.1087 16.491 17.5326 16.1784 17.8452C15.8659 18.1578 15.4419 18.3334 14.9999 18.3334H4.99992C4.55789 18.3334 4.13397 18.1578 3.82141 17.8452C3.50885 17.5326 3.33325 17.1087 3.33325 16.6667V4.16669C3.33325 3.72466 3.50885 3.30074 3.82141 2.98818C4.13397 2.67562 4.55789 2.50002 4.99992 2.50002H6.17992ZM9.99992 11.6667H7.49992C7.2789 11.6667 7.06694 11.7545 6.91066 11.9108C6.75438 12.067 6.66659 12.279 6.66659 12.5C6.66659 12.721 6.75438 12.933 6.91066 13.0893C7.06694 13.2456 7.2789 13.3334 7.49992 13.3334H9.99992C10.2209 13.3334 10.4329 13.2456 10.5892 13.0893C10.7455 12.933 10.8333 12.721 10.8333 12.5C10.8333 12.279 10.7455 12.067 10.5892 11.9108C10.4329 11.7545 10.2209 11.6667 9.99992 11.6667ZM12.4999 8.33336H7.49992C7.28752 8.33359 7.08322 8.41492 6.92878 8.56073C6.77433 8.70654 6.68139 8.90582 6.66894 9.11785C6.65649 9.32989 6.72548 9.53867 6.86181 9.70155C6.99813 9.86443 7.19151 9.9691 7.40242 9.99419L7.49992 10H12.4999C12.7209 10 12.9329 9.91223 13.0892 9.75594C13.2455 9.59966 13.3333 9.3877 13.3333 9.16669C13.3333 8.94568 13.2455 8.73371 13.0892 8.57743C12.9329 8.42115 12.7209 8.33336 12.4999 8.33336ZM9.99992 1.66669C10.3517 1.66617 10.6997 1.74016 11.0208 1.8838C11.342 2.02743 11.6291 2.23744 11.8633 2.50002C12.2199 2.89836 12.4499 3.41086 12.4924 3.97669L12.4999 4.16669H7.49992C7.49992 3.56252 7.71409 3.00836 8.07075 2.57669L8.13659 2.50002C8.59492 1.98836 9.25992 1.66669 9.99992 1.66669Z"
          fill={color}
        />
      </svg>
    </>
  );
};

export default TryoutIcon;
