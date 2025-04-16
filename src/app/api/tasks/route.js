import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
const filePath = path.join(process.cwd(), "src", "data", "task.json");
import { revalidatePath } from "next/cache";

// ############################################### GET ###############################################
export async function GET() {
  try {
    const fileData = await fs.readFile(filePath, "utf8");
    const { tasks: existingTasks } = JSON.parse(fileData);
    
    return NextResponse.json(existingTasks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching tasks" },
      { status: 500 }
    );
  }
}

// GET http://localhost:3000/api/tasks

// ############################################### POST ###############################################
export async function POST(request) {
  try {
    const fileData = await fs.readFile(filePath, "utf8");
    const { tasks: existingTasks } = JSON.parse(fileData);

    // get user input
    const newtaskinput = await request.json();

    const maxId = Math.max(...existingTasks.map((task) => task.id), 0);
    const id = maxId + 1;
    const taskname = newtaskinput.taskname;
    const status = false;
    const datecreated = new Date().toISOString();
    const datelastedit = "";

    const newTask = {
      id,
      taskname,
      status,
      datecreated,
      datelastedit,
    };

    // add new task entry to existing tasks
    const newContent = [...existingTasks, newTask];

    // Create the proper JSON structure
    const jsonContent = {
      tasks: newContent,
    };

    await fs.writeFile(filePath, JSON.stringify(jsonContent, null, 2), "utf8");
    console.log("Task entry saved successfully");
    revalidatePath("/");
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error saving task entry" },
      { status: 500 }
    );
  }
}

// POST http://localhost:3000/api/tasks
// body as { "taskname": "Test Task"}

// ############################################### DELETE ###############################################

export async function DELETE(request) {
  try {
    const fileData = await fs.readFile(filePath, "utf8");
    const { tasks: existingTasks } = JSON.parse(fileData);

    // get user input
    const deletetaskid = await request.json();

    // find task with id and filter out
    const updatedTasks = existingTasks.filter(
      (task) => task.id !== deletetaskid.id
    );

    // Create the proper JSON structure
    const jsonContent = {
      tasks: updatedTasks,
    };

    await fs.writeFile(filePath, JSON.stringify(jsonContent, null, 2), "utf8");
    console.log("Task entry deleted successfully");
    revalidatePath("/");
    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting task from database:" },
      { status: 500 }
    );
  }
}
// DELETE http://localhost:3000/api/tasks
// body as { "id": 6}

// ############################################### PATCH ###############################################

// PATCH = partial update of data object, PUT = full update of data object
export async function PATCH(request) {
  try {
    const fileData = await fs.readFile(filePath, "utf8");
    const { tasks: existingTasks } = JSON.parse(fileData);

    // get user input
    const updatedtaskinput = await request.json();

    // Map through tasks and update taskname for matching id
    const updatedTasks = existingTasks.map((task) => {
      if (task.id === updatedtaskinput.id) {
        return {
          ...task,
          taskname: updatedtaskinput.taskname,
          status: updatedtaskinput.status,
          datelastedit: new Date().toISOString(),
        };
      }
      return task;
    });
    
    // Create the proper JSON structure
    const jsonContent = {
      tasks: updatedTasks,
    };

    await fs.writeFile(filePath, JSON.stringify(jsonContent, null, 2), "utf8");
    console.log("Task updated successfully");
    revalidatePath("/");
    return NextResponse.json(
      { message: "Task updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating task entry" },
      { status: 500 }
    );
  }
}

// PATCH http://localhost:3000/api/tasks
// body as { "id": 6, "taskname": "Changed Task"}
