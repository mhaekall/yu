import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { fetchCVs } from "@/lib/queries/fetchCVs";

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const cvs = await fetchCVs(supabase);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My CVs</h1>
        <Link
          href="/builder/new"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Create New CV
        </Link>
      </div>

      {cvs.length === 0 ? (
        <div className="text-center p-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium text-gray-600 mb-4">
            You haven't created any CVs yet
          </h3>
          <p className="text-gray-500 mb-6">
            Get started by creating your first CV
          </p>
          <Link
            href="/builder/new"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Create CV
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cvs.map((cv) => (
            <div
              key={cv.id}
              className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-medium mb-2">{cv.title || "Untitled CV"}</h3>
              <p className="text-gray-500 mb-4">
                Last updated: {new Date(cv.updated_at).toLocaleDateString()}
              </p>
              <div className="flex gap-3">
                <Link
                  href={`/builder/${cv.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Edit
                </Link>
                <button className="text-red-600 hover:text-red-800 font-medium">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
