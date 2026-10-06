export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type DatabaseType = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      address: {
        Row: {
          address: string | null;
          city: string | null;
          country_code: string | null;
          created_at: string | null;
          flag: string | null;
          id: string;
          is_default: boolean | null;
          phone: string | null;
          region: string | null;
          state: string | null;
          title: string | null;
          user_id: string;
        };
        Insert: {
          address?: string | null;
          city?: string | null;
          country_code?: string | null;
          created_at?: string | null;
          flag?: string | null;
          id?: string;
          is_default?: boolean | null;
          phone?: string | null;
          region?: string | null;
          state?: string | null;
          title?: string | null;
          user_id: string;
        };
        Update: {
          address?: string | null;
          city?: string | null;
          country_code?: string | null;
          created_at?: string | null;
          flag?: string | null;
          id?: string;
          is_default?: boolean | null;
          phone?: string | null;
          region?: string | null;
          state?: string | null;
          title?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      categories: {
        Row: {
          created_at: string | null;
          id: string;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          address: string;
          amount_paid: number;
          city: string | null;
          color: string | null;
          country_code: string | null;
          created_at: string | null;
          id: string;
          image_url: string;
          phone: string;
          product_category: string | null;
          product_name: string;
          quantity_bought: number;
          reference_paystack: string;
          region: string | null;
          size: string | null;
          state: string | null;
          status: string;
          updated_at: string | null;
          user_email: string | null;
          user_id: string;
        };
        Insert: {
          address: string;
          amount_paid: number;
          city?: string | null;
          color?: string | null;
          country_code?: string | null;
          created_at?: string | null;
          id?: string;
          image_url: string;
          phone: string;
          product_category?: string | null;
          product_name: string;
          quantity_bought: number;
          reference_paystack: string;
          region?: string | null;
          size?: string | null;
          state?: string | null;
          status: string;
          updated_at?: string | null;
          user_email?: string | null;
          user_id: string;
        };
        Update: {
          address?: string;
          amount_paid?: number;
          city?: string | null;
          color?: string | null;
          country_code?: string | null;
          created_at?: string | null;
          id?: string;
          image_url?: string;
          phone?: string;
          product_category?: string | null;
          product_name?: string;
          quantity_bought?: number;
          reference_paystack?: string;
          region?: string | null;
          size?: string | null;
          state?: string | null;
          status?: string;
          updated_at?: string | null;
          user_email?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          author_id: string;
          brand: string | null;
          category: string;
          colors: string[] | null;
          created_at: string | null;
          description: string | null;
          discount: number | null;
          id: string;
          image_url_array: string[];
          location: string | null;
          name: string;
          offer_price: number | null;
          price: number;
          product_comment: string | null;
          product_shipping_fee: number | null;
          quantity: number;
          sizes: string[] | null;
          styles: string[] | null;
          updated_at: string | null;
          video_url_array: string[] | null;
        };
        Insert: {
          author_id: string;
          brand?: string | null;
          category: string;
          colors?: string[] | null;
          created_at?: string | null;
          description?: string | null;
          discount?: number | null;
          id?: string;
          image_url_array: string[];
          location?: string | null;
          name: string;
          offer_price?: number | null;
          price: number;
          product_comment?: string | null;
          product_shipping_fee?: number | null;
          quantity: number;
          sizes?: string[] | null;
          styles?: string[] | null;
          updated_at?: string | null;
          video_url_array?: string[] | null;
        };
        Update: {
          author_id?: string;
          brand?: string | null;
          category?: string;
          colors?: string[] | null;
          created_at?: string | null;
          description?: string | null;
          discount?: number | null;
          id?: string;
          image_url_array?: string[];
          location?: string | null;
          name?: string;
          offer_price?: number | null;
          price?: number;
          product_comment?: string | null;
          product_shipping_fee?: number | null;
          quantity?: number;
          sizes?: string[] | null;
          styles?: string[] | null;
          updated_at?: string | null;
          video_url_array?: string[] | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_category";
            columns: ["category"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          avatar_url: string | null;
          created_at: string | null;
          email: string | null;
          full_name: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string | null;
          email?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<DatabaseType, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof DatabaseType,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
