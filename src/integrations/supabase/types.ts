export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          badge_id: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          unlocked_at: string
          user_id: string
        }
        Insert: {
          badge_id: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          unlocked_at?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          unlocked_at?: string
          user_id?: string
        }
        Relationships: []
      }
      premium: {
        Row: {
          expires_at: string | null
          payment_id: string | null
          payment_status: string | null
          plan_type: string
          subscribed_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          expires_at?: string | null
          payment_id?: string | null
          payment_status?: string | null
          plan_type?: string
          subscribed_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          expires_at?: string | null
          payment_id?: string | null
          payment_status?: string | null
          plan_type?: string
          subscribed_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age_exact: number | null
          avatar_url: string | null
          created_at: string
          days_per_week: string | null
          email: string | null
          environment: string | null
          height_exact: number | null
          id: string
          level: string | null
          motivation_type: string | null
          name: string | null
          objective: string | null
          training_barrier: string | null
          updated_at: string
          weight_exact: number | null
        }
        Insert: {
          age_exact?: number | null
          avatar_url?: string | null
          created_at?: string
          days_per_week?: string | null
          email?: string | null
          environment?: string | null
          height_exact?: number | null
          id: string
          level?: string | null
          motivation_type?: string | null
          name?: string | null
          objective?: string | null
          training_barrier?: string | null
          updated_at?: string
          weight_exact?: number | null
        }
        Update: {
          age_exact?: number | null
          avatar_url?: string | null
          created_at?: string
          days_per_week?: string | null
          email?: string | null
          environment?: string | null
          height_exact?: number | null
          id?: string
          level?: string | null
          motivation_type?: string | null
          name?: string | null
          objective?: string | null
          training_barrier?: string | null
          updated_at?: string
          weight_exact?: number | null
        }
        Relationships: []
      }
      progress: {
        Row: {
          completed_date: string
          created_at: string
          exercises: Json | null
          id: string
          notes: string | null
          user_id: string
          workout_day: number
        }
        Insert: {
          completed_date: string
          created_at?: string
          exercises?: Json | null
          id?: string
          notes?: string | null
          user_id: string
          workout_day: number
        }
        Update: {
          completed_date?: string
          created_at?: string
          exercises?: Json | null
          id?: string
          notes?: string | null
          user_id?: string
          workout_day?: number
        }
        Relationships: []
      }
      stats: {
        Row: {
          current_streak: number | null
          last_workout_date: string | null
          longest_streak: number | null
          total_workouts: number | null
          updated_at: string
          user_id: string
          week_progress: number | null
        }
        Insert: {
          current_streak?: number | null
          last_workout_date?: string | null
          longest_streak?: number | null
          total_workouts?: number | null
          updated_at?: string
          user_id: string
          week_progress?: number | null
        }
        Update: {
          current_streak?: number | null
          last_workout_date?: string | null
          longest_streak?: number | null
          total_workouts?: number | null
          updated_at?: string
          user_id?: string
          week_progress?: number | null
        }
        Relationships: []
      }
      user_workouts: {
        Row: {
          created_at: string
          days: number
          description: string | null
          environment: string | null
          id: string
          level: string | null
          name: string
          objective: string | null
          plan: Json
          plan_id: string
          tags: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          days: number
          description?: string | null
          environment?: string | null
          id?: string
          level?: string | null
          name: string
          objective?: string | null
          plan: Json
          plan_id: string
          tags?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          days?: number
          description?: string | null
          environment?: string | null
          id?: string
          level?: string | null
          name?: string
          objective?: string | null
          plan?: Json
          plan_id?: string
          tags?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
