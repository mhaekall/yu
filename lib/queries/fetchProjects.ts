import { SupabaseClient } from "@supabase/supabase-js";
import { Project } from "../types";

export const fetchProjects = async (supabase: SupabaseClient): Promise<Project[]> => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data || [];
};

export default fetchProjects;
