import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class ProjectsService {
  private supabase: SupabaseClient;

  constructor() {
    // Adding "as string" tells TypeScript to stop complaining
    const url = process.env.SUPABASE_URL as string;
    const key = process.env.SUPABASE_KEY as string;

    if (!url || !key) {
      throw new Error("Missing Supabase Credentials in .env!");
    }

    this.supabase = createClient(url, key);
  }

  async findAll() {
    const { data } = await this.supabase.from('projects').select('*');
    return data;
  }

  async createContact(body: any) {
    const { data, error } = await this.supabase.from('contacts').insert([body]);
    return { success: !error, data };
  }
}