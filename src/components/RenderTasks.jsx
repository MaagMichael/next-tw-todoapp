import { GetTasks } from "@/actions/actions";
import BoxTask from "./BoxTask";

export default async function RenderTasks() {
  
  const taskEntries = await GetTasks();

  // via API Router - tbd
  // const response = await fetch("http://localhost:3000/api/tasks");
  // const taskEntries = await response.json()

  return (
    <div className="mt-12">
      <h1 className="text-lg font-semibold">Tasks</h1>
      {taskEntries.map((task) => (
        <BoxTask key={task.id} {...task} />
      ))}
    </div>
  );
}
