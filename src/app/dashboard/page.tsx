import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import Dashboard from "@/components/Dashboard";

export default async function DashboardPage() {
  // Fetch the session on the server side
  const session = await getServerSession(authOptions);

  // Redirect to the homepage if the user is not logged in
  if (!session) {
    redirect("/");
  }

  return <Dashboard />;
}
