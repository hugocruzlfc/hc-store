import { DatabaseType } from "@/lib/supabase/types";

export type ProductCategory = {
  id: string;
  name: string;
};

export type ProductParams = Omit<
  DatabaseType["public"]["Tables"]["products"]["Row"],
  | "category"
  | "brand"
  | "description"
  | "discount"
  | "location"
  | "product_comment"
  | "product_shipping_fee"
  | "offer_price"
  | "sizes"
  | "colors"
  | "styles"
  | "created_at"
  | "updated_at"
> & {
  category: ProductCategory | string | null;
  brand: string | null;
  description: string | null;
  discount: number | null;
  location: string | null;
  product_comment: string | null;
  product_shipping_fee: number | null;
  offer_price: number | null;
  sizes: string[] | null;
  colors: string[] | null;
  styles: string[] | null;
  created_at: string | null;
  updated_at: string | null;
  status?: string;
  videos_url_array?: string[] | null;
};

export type AddressParams = DatabaseType["public"]["Tables"]["address"]["Row"];

export type OrderStatus =
  | "processing"
  | "completed"
  | "cancelled"
  | "shipped"
  | "delivered"
  | "returned"
  | "waiting"
  | "reviewed";

export type OrderParams = DatabaseType["public"]["Tables"]["orders"]["Row"];
