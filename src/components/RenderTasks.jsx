
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

// SERVER Component Fetch (RenderTasks.jsx)
// const response = await fetch("http://localhost:3000/api/tasks", {
//   cache: "no-store",
// });

// In this server component, the absolute URL http://localhost:3000/api/tasks is used because:

// 1 Server-side execution: Server components run on the server during build time or request time
// 2 No browser context: The server doesn't have the concept of "current origin" like a browser does
// 3 Explicit host required: The server needs to know exactly where to make the request to

// CLIENT Component Fetch
// // How it would be done in a client component
// const response = await fetch("/api/tasks");

// In client components, relative URLs like /api/tasks work because:

// 1 Browser context: Client components run in the browser, which automatically resolves relative URLs against the current origin
// 2 Implicit host: The browser adds the current domain (e.g., http://localhost:3000) to relative paths
// 3 Simpler code: No need to hardcode the domain, making the code more portable across environments