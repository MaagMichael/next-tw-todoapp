"use client";
import { useState } from "react";

export default function EditButton(item) {
  const [isopen, setIsOpen] = useState(false);
  const [itemName, setItemName] = useState(item.taskname);

  const handleClick = () => {
    // reset changes in useState
    setItemName(item.taskname);
    // close modal
    setIsOpen(!isopen);
  };

  const EditTasks = async (event) => {
    event.preventDefault();

    const data = {
      id: item.id,  // Get id directly from item props
      taskname: itemName, // useState value
      // status: item.status,
      datelastedit: new Date().toISOString(),
    };

    try {
      const response = await fetch(`/api/tasks`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      window.location.reload();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <>
      {!isopen && (
        <button className=" mr-2" onClick={handleClick}>
          {" "}
          ✏️
        </button>
      )}

      {isopen && (
        <div className="fixed inset-0 bg-slate-500/60 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 relative">
            <form onSubmit={EditTasks} className="p-6 space-y-4">
              <div className="flex flex-col">
                <label
                  htmlFor="taskname"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Task Name to edit
                </label>
                <input
                  type="text"
                  id="taskname"
                  name="taskname"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pinky"
                  required
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-pinky hover:bg-pinky/70 text-white py-2 px-4 rounded-md "
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
