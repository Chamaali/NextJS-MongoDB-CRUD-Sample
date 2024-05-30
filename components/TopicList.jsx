import React from "react";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3001/api/topics", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading topics", error);
  }
};

export default async function TopicList() {
  const { topics } = await getTopics();
  return (
    <div>
      {topics.map((t) => (
        <div
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
          key={t._id}
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={t._id} />
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

// export default async function TopicList() {
//     try {
//       const { topics } = await getTopics();

//       // Check if topics is defined before accessing it
//       if (!topics) {
//         // Handle case where topics is undefined
//         // You can throw an error, show a message to the user, or take other appropriate actions
//         throw new Error("Topics not found");
//       }

//       // Render your component with topics
//       return (
//         <>
//           {topics.map((t) => (
//             <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
//       <div>
//          <h2 className="font-bold text-2xl">{t.title}</h2>
//            <div>{t.description}</div>
//         </div>

//            <div className="flex gap-2">
//             <RemoveBtn />
//            <Link href={`/editTopic/${t._id}`}>
//               <HiPencilAlt size={24} />
//              </Link>
//            </div>
//            </div>
//           ))}
//         </>
//       );
//     } catch (error) {
//       // Handle any errors that occur during fetching or processing topics
//       console.error("Error fetching topics:", error);
//       // You can render an error message or take other appropriate actions
//       return <div>Error: {error.message}</div>;
//     }
//   }
