import DashboardLayout from "../layouts/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">
          Dashboard
        </h1>

        <p className="text-gray-600 text-sm sm:text-base">
          Welcome to LMS Dashboard
        </p>
      </div>
    </DashboardLayout>
  );
}
