'use client'

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function EditTopicForm({ id, title, description }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3001/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });

      if (!res.ok) {
        console.log("Failed to update topicc !", res.statusText);
        throw new Error("Failed to update topic");
      }else{
        alert("Topic updated successfully");
        
      }

      router.push("/");
    router.refresh();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle}
          type="text"
          placeholder="titles"
          className="border border-slate-500 px-8 py-2"
        />
        <input
          onChange={(e) => setNewDescription(e.target.value)}
          value={newDescription}
          type="text"
          placeholder="description"
          className="border border-slate-500 px-8 py-2"
        />
        <button type="submit" className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
          Update Topic
        </button>
      </form>

  );
}
