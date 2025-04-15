
export default function CreateTask2() {

  //  form action with a server function
  async function CreateTasks(formData) {
    "use server";

    const taskname = formData.get("taskname");

    try {
      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskname }),
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      window.location.reload();
      
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  return (
    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-full max-w-lg">
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-2">New Todo:</h2>

        <form action={CreateTasks} className="flex justify-between">
          <input
            type="text"
            id="taskname"
            name="taskname"
            placeholder="write here"
            maxLength="50"
            required
            className="w-4/5 border border-gray-300 rounded-md px-3 py-2"
          />
          <button
            type="submit"
            className="bg-pinky text-white px-4 py-2 rounded-md hover:bg-pinky/80"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
