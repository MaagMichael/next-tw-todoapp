import CreateTask from "@/components/CreateTask";
// import CreateTask2 from "@/components/CreateTask2";
import RenderTasks from "@/components/RenderTasks";

export default function Home() {  

  return (
    <>
      <div className="bg-pinky w-full h-[18vh] text-center">API Router, run on port 3_000</div>
      <div className="max-w-lg mx-auto">
        <CreateTask />
        {/* <CreateTask2 /> */}
        <RenderTasks />
      </div>
    </>
  );
}
