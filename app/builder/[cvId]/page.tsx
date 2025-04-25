import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CVEditor from "@/components/cv/CVEditor";

export default async function CVBuilderPage({
  params,
}: {
  params: { cvId: string };
}) {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  // Handle "new" CV creation
  if (params.cvId === "new") {
    const { data: newCV, error } = await supabase
      .from("cvs")
      .insert({
        user_id: session.user.id,
        title: "Untitled CV",
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating new CV:", error);
      return <div>Error creating new CV. Please try again.</div>;
    }

    redirect(`/builder/${newCV.id}`);
  }

  // Fetch CV data
  const { data: cv, error: cvError } = await supabase
    .from("cvs")
    .select("*")
    .eq("id", params.cvId)
    .eq("user_id", session.user.id)
    .single();

  if (cvError || !cv) {
    return <div>CV not found or you don't have permission to view it.</div>;
  }

  // Fetch CV sections
  const { data: sections, error: sectionsError } = await supabase
    .from("cv_sections")
    .select("*")
    .eq("cv_id", params.cvId)
    .order("order", { ascending: true });

  if (sectionsError) {
    console.error("Error fetching CV sections:", sectionsError);
    return <div>Error loading CV sections. Please try again.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <CVEditor cv={cv} sections={sections || []} />
    </div>
  );
}
