"use client";

import { DeleteTasks } from "@/actions/actions";
import { ToggleTasks } from "@/actions/actions";


import { useState } from "react";
import EditButton from "./EditButton";

export default function BoxTask(item) {
  const [isChecked, setIsChecked] = useState(item.status);

  const handleCheckboxChange = async () => {
    setIsChecked(!isChecked);
    await ToggleTasks(item.id);
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
        <button className="" onClick={() => DeleteTasks(item.id)}>
          🗑️
        </button>
      </div>
    </div>
  );
}
