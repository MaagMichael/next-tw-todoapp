
import BoxTask from "./BoxTask";

export default async function RenderTasks() {

  // Added cache: "no-store" option to ensure fresh data on each request
  const response = await fetch("http://localhost:3000/api/tasks", {
    cache: "no-store",
  });
  const taskEntries = await response.json();

  return (
    <div className="mt-12">
      <h1 className="text-lg font-semibold">Tasks</h1>
      {taskEntries.map((task) => (
        <BoxTask key={task.id} {...task} />
      ))}
    </div>
  );
}
