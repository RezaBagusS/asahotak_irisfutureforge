const DashboardIcon = ({ fill = "black", width = 30, height = 30 }) => {
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
        <g clipPath="url(#clip0_363_612)">
          <path
            d="M17.9166 9.08335V3.41669C17.9166 2.16669 17.3832 1.66669 16.0582 1.66669H12.6916C11.3666 1.66669 10.8333 2.16669 10.8333 3.41669V9.08335C10.8333 10.3334 11.3666 10.8334 12.6916 10.8334H16.0582C17.3832 10.8334 17.9166 10.3334 17.9166 9.08335Z"
            fill={color}
          />
          <path
            d="M9.16659 10.9167V16.5834C9.16659 17.8334 8.63325 18.3334 7.30825 18.3334H3.94159C2.61659 18.3334 2.08325 17.8334 2.08325 16.5834V10.9167C2.08325 9.66669 2.61659 9.16669 3.94159 9.16669H7.30825C8.63325 9.16669 9.16659 9.66669 9.16659 10.9167Z"
            fill={color}
          />
          <path
            d="M17.9166 16.5833V14.25C17.9166 13 17.3832 12.5 16.0582 12.5H12.6916C11.3666 12.5 10.8333 13 10.8333 14.25V16.5833C10.8333 17.8333 11.3666 18.3333 12.6916 18.3333H16.0582C17.3832 18.3333 17.9166 17.8333 17.9166 16.5833Z"
            fill={color}
          />
          <path
            d="M9.16659 5.75002V3.41669C9.16659 2.16669 8.63325 1.66669 7.30825 1.66669H3.94159C2.61659 1.66669 2.08325 2.16669 2.08325 3.41669V5.75002C2.08325 7.00002 2.61659 7.50002 3.94159 7.50002H7.30825C8.63325 7.50002 9.16659 7.00002 9.16659 5.75002Z"
            fill={color}
          />
        </g>
        <defs>
          <clipPath id="clip0_363_612">
            <rect width={width} height={height} fill={fill} />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};

export default DashboardIcon;
