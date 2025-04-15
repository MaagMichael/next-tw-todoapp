"use client";

import { useState } from "react";
import EditButton from "./EditButton";

export default function BoxTask(item) {
  const [isChecked, setIsChecked] = useState(item.status);

  const handleCheckboxChange = async () => {
    setIsChecked(!isChecked);
    await ToggleTasks(item.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/tasks`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        // Refresh the page or update the UI
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="flex justify-between mt-4 p-4 border border-gray-300  rounded-md">
      <div className="flex">
        <input
          onChange={handleCheckboxChange}
          type="checkbox"
          className="mr-4"
          checked={isChecked}
        />
        <h2 className={`${isChecked ? "line-through" : ""}`}>
          {item.taskname}
        </h2>
      </div>

      <div>
        <EditButton {...item} />
        <button className="" onClick={() => handleDelete(item.id)}>
          🗑️
        </button>
      </div>
    </div>
  );
}
