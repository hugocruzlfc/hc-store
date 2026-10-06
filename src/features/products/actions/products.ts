"use server";

import { supabaseServerClient } from "@/lib/supabase/server";
import { ProductParams } from "@/shared/types";

export async function fetchProducts(): Promise<ProductParams[]> {
  const supabase = await supabaseServerClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("*, category:categories!fk_category(id, name)")
    .returns<ProductParams[]>();

  if (error) {
    console.log(error);
    return [];
  }

  return products ?? [];
}

export async function fetchProductById(id: string) {
  const supabase = await supabaseServerClient();
  try {
    const { data: product, error } = await supabase
      .from("products")
      .select("*, category:categories!fk_category(id, name)")
      .eq("id", id)
      .single();

    if (error) {
      console.log(error);
      return null;
    }

    return product as ProductParams | null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
