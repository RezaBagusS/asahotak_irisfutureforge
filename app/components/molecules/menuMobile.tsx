// import CustListModule from "../atoms/custListModule";

// interface MenuMobileProps {}

// const dataModule = [
//     {
//       title: "Dashboard",
//       link: "/dashboard",
//     },
//     {
//       title: "Course",
//       link: "/dashboard/courses",
//     },
//     {
//       title: "Tryout",
//       link: "/dashboard/tryout",
//     },
//     {
//       title: "Setting",
//       link: "/setting",
//     },
//   ];

// const MenuMobile = ({}: MenuMobileProps) => {
//     return (
//         <div className="absolute left-0 top-0 h-screen bg-white w-1/2">
//             <div className="flex flex-col gap-5 pt-20 px-8">
//             {dataModule.map((item, index) => {
//           return (
//             <CustListModule
//               key={index}
//               title={item.title}
//               icon={handleIcon(item.title, item.link)}
//               link={item.link}
//               isActive={pathname === item.link}
//             />
//           );
//         })}
//             </div>
//         </div>
//     )
// }