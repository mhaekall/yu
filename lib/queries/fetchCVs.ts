import { SupabaseClient } from "@supabase/supabase-js";
import { CV } from "../types";

export const fetchCVs = async (supabase: SupabaseClient): Promise<CV[]> => {
  const { data, error } = await supabase
    .from("cvs")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error fetching CVs:", error);
    return [];
  }

  return data || [];
};

export default fetchCVs;
