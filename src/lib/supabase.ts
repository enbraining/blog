import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL ?? '', process.env.SUPABASE_ANON_KEY ?? '');

export interface Post {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

export async function fetchPost() {
  const { data: posts } = await supabase
    .from('post')
    .select('*')
    .order('date', { ascending: false });
  return posts;
}