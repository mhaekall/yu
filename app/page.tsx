import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-4xl font-bold mb-6">Build Your Professional CV</h1>
      <p className="max-w-lg mb-8 text-gray-600">
        Create, edit, and export professional CVs with our easy-to-use builder. Get started in minutes and stand out from the crowd.
      </p>
      <Link 
        href="/auth/login" 
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
      >
        Get Started
      </Link>
    </div>
  );
}
