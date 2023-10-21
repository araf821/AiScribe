export default function Home() {
  return (
    <div className="grainy min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="max-w-md text-center text-7xl font-semibold ">
          AI <span className="font-bold text-green-600">Note Taking</span>{" "}
          Assistant
        </h1>
        <div className="mt-4"></div>
        <h2 className="text-center text-3xl font-semibold text-slate-700">
          AI Powered
        </h2>
      </div>
    </div>
  );
}
