import { requireAuth } from "@/lib/auth-utils";

export default async function Dashboard() {

    await requireAuth();
    return (
        <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
    )
}