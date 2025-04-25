import { SupabaseClient } from "@supabase/supabase-js";

export const updateSection = async (
  supabase: SupabaseClient,
  sectionId: string,
  content: any
) => {
  const { data, error } = await supabase
    .from("cv_sections")
    .update({ content, updated_at: new Date().toISOString() })
    .eq("id", sectionId)
    .select()
    .single();

  if (error) {
    console.error("Error updating section:", error);
    throw error;
  }

  return data;
};

export default updateSection;
