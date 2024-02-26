import Task from "./components/Task/Task";

export default function Home() {
  return (
    <main>
      <div className="card-wrapper">
        <div className="card w-100 bg-base-100 shadow-xl">
          <div className="card-body min-h-screen">
            <Task />
          </div>
        </div>
      </div>
    </main>
  );
}
