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
            <form
              action={async (formData) => {
                // object to send to EditTasks function
                const data = {
                  id: item.id,
                  taskname: formData.get("taskname"),
                };
                await EditTasks(data);
                setIsOpen(false);
              }}
              className="p-6 space-y-4"
            >
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
