// import { api } from "../../utils/api";

// /* This example requires Tailwind CSS v2.0+ */
// const people = [
//   {
//     name: "Lindsay Walton",
//     title: "Front-end Developer",
//     department: "Optimization",
//     email: "lindsay.walton@example.com",
//     role: "Member",
//     image:
//       "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   },
//   // More people...
// ];
// import Logo from 'src\resources\images\logo.png'

export default function Homemain() {
//   const { data } = api.userRouter.leaderboard.useQuery();
  return (
    // <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
    //   <div className="mt-8 flex flex-col">
    //     <div className="overflow-x-auto">
    //       <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
    //         <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
    //           <table className="min-w-full divide-y divide-gray-300">
    //             <thead className="bg-gray-50">
    //               <tr>
    //                 <th
    //                   scope="col"
    //                   className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
    //                 >
    //                   Name
    //                 </th>
    //                 <th
    //                   scope="col"
    //                   className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
    //                 >
    //                   Year
    //                 </th>
    //                 <th
    //                   scope="col"
    //                   className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
    //                 >
    //                   Branch
    //                 </th>
    //                 <th
    //                   scope="col"
    //                   className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
    //                 >
    //                   Points
    //                 </th>
    //               </tr>
    //             </thead>
    //             <tbody className="divide-y divide-gray-200 bg-white">
    //               {data?.map((person) => (
    //                 <tr key={person.email}>
    //                   <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
    //                     <div className="flex items-center">
    //                       <div className="h-10 w-10 flex-shrink-0">
    //                         <img
    //                           className="h-10 w-10 rounded-full"
    //                           src={person.image ?? ""}
    //                           alt={person.name ?? ""}
    //                         />
    //                       </div>
    //                       <div className="ml-4">
    //                         <div className="font-medium text-gray-900">
    //                           {person.name}
    //                         </div>
    //                         <div className="text-gray-500">{person.email}</div>
    //                       </div>
    //                     </div>
    //                   </td>
    //                   <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
    //                     <div className="text-gray-900">{person.year}</div>
    //                   </td>
    //                   <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
    //                     <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
    //                       {person.branch}
    //                     </span>
    //                   </td>
    //                   <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
    //                     <div className="text-gray-900">{person.total}</div>
    //                   </td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </table>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="flex flex-row">
<div className="max-w-2xl"><img src="/images/hmainbg.svg" alt="Wait" /></div>
<div className="justify-center mt-40 m-32 text-purple-900 font-bold" ><h1 className="text-5xl  ">Welcome to 
Ask Your Seniors</h1>
<p className="mt-4 text-purple-900 font-bold">One place for all your queries</p></div>
    </div>
  );
}
