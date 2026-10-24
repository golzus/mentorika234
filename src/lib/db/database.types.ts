export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      leads: {
        Row: {
          created_at: string;
          created_by: string | null;
          email: string | null;
          id: string;
          interested_in: string | null;
          name: string;
          next_task: string | null;
          notes: string | null;
          phone: string | null;
          proposed_price: string | null;
          source: string | null;
          status: string;
          updated_at: string;
          updated_by: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          email?: string | null;
          id?: string;
          interested_in?: string | null;
          name: string;
          next_task?: string | null;
          notes?: string | null;
          phone?: string | null;
          proposed_price?: string | null;
          source?: string | null;
          status?: string;
          updated_at?: string;
          updated_by?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          email?: string | null;
          id?: string;
          interested_in?: string | null;
          name?: string;
          next_task?: string | null;
          notes?: string | null;
          phone?: string | null;
          proposed_price?: string | null;
          source?: string | null;
          status?: string;
          updated_at?: string;
          updated_by?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "leads_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      marketing_goals: {
        Row: {
          actions: Json | null;
          category: string;
          created_at: string;
          created_by: string | null;
          description: string | null;
          id: string;
          measurable_target: string | null;
          status: string;
          target_date: string | null;
          title: string;
          updated_at: string;
          updated_by: string | null;
          user_id: string;
          weekly_task: string | null;
        };
        Insert: {
          actions?: Json | null;
          category: string;
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          measurable_target?: string | null;
          status?: string;
          target_date?: string | null;
          title: string;
          updated_at?: string;
          updated_by?: string | null;
          user_id: string;
          weekly_task?: string | null;
        };
        Update: {
          actions?: Json | null;
          category?: string;
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          measurable_target?: string | null;
          status?: string;
          target_date?: string | null;
          title?: string;
          updated_at?: string;
          updated_by?: string | null;
          user_id?: string;
          weekly_task?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "marketing_goals_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          business_field: string | null;
          business_name: string | null;
          created_at: string;
          first_name: string | null;
          golden_circle: Json | null;
          id: string;
          last_name: string | null;
          monthly_salary_target: number | null;
          new_clients_target: number | null;
          slogan: string | null;
          updated_at: string;
        };
        Insert: {
          business_field?: string | null;
          business_name?: string | null;
          created_at?: string;
          first_name?: string | null;
          golden_circle?: Json | null;
          id: string;
          last_name?: string | null;
          monthly_salary_target?: number | null;
          new_clients_target?: number | null;
          slogan?: string | null;
          updated_at?: string;
        };
        Update: {
          business_field?: string | null;
          business_name?: string | null;
          created_at?: string;
          first_name?: string | null;
          golden_circle?: Json | null;
          id?: string;
          last_name?: string | null;
          monthly_salary_target?: number | null;
          new_clients_target?: number | null;
          slogan?: string | null;
          updated_at?: string;
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
