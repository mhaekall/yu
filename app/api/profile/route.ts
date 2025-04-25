import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Error fetching profile" },
      { status: 500 }
    );
  }

  return NextResponse.json(profile);
}

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { name, bio, avatar_url } = body;

    const updates = {
      id: session.user.id,
      updated_at: new Date().toISOString(),
      ...(name && { name }),
      ...(bio && { bio }),
      ...(avatar_url && { avatar_url }),
    };

    const { data, error } = await supabase
      .from("profiles")
      .upsert(updates)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Error updating profile" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Error updating profile" },
      { status: 500 }
    );
  }
}
