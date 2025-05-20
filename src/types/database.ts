
/**
 * This file contains TypeScript definitions for our Supabase database tables
 */
import { Database as SupabaseDatabase } from '@/integrations/supabase/types';

// Extend the Supabase Database type with our additional tables
export interface Database extends SupabaseDatabase {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          email: string;
          objective?: string;
          level?: string;
          days_per_week?: string;
          environment?: string;
          age?: string;
          weight?: string;
          height?: string;
          age_exact?: number;
          weight_exact?: number;
          height_exact?: number;
          motivation_type?: string;
          training_barrier?: string;
          created_at?: string;
          updated_at?: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          email: string;
          objective?: string;
          level?: string;
          days_per_week?: string;
          environment?: string;
          age?: string;
          weight?: string;
          height?: string;
          age_exact?: number;
          weight_exact?: number;
          height_exact?: number;
          motivation_type?: string;
          training_barrier?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          email?: string;
          objective?: string;
          level?: string;
          days_per_week?: string;
          environment?: string;
          age?: string;
          weight?: string;
          height?: string;
          age_exact?: number;
          weight_exact?: number;
          height_exact?: number;
          motivation_type?: string;
          training_barrier?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_workouts: {
        Row: {
          id: string;
          user_id: string;
          data: any;
          created_at?: string;
          updated_at?: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          data: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          data?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
      progress: {
        Row: {
          id: string;
          user_id: string;
          workout_date: string;
          completed_exercises: any[];
          streak: number;
          created_at?: string;
          updated_at?: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          workout_date: string;
          completed_exercises: any[];
          streak: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          workout_date?: string;
          completed_exercises?: any[];
          streak?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    } & SupabaseDatabase['public']['Tables'];
    Views: SupabaseDatabase['public']['Views'];
    Functions: SupabaseDatabase['public']['Functions'];
    Enums: SupabaseDatabase['public']['Enums'];
    CompositeTypes: SupabaseDatabase['public']['CompositeTypes'];
  };
}

// Type for the Supabase client with our database schema
export type TypedSupabaseClient = ReturnType<typeof createTypedSupabaseClient>;

// Function to create a typed Supabase client
import { createClient } from '@supabase/supabase-js';
export const createTypedSupabaseClient = () => 
  createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL || '',
    import.meta.env.VITE_SUPABASE_ANON_KEY || ''
  );
