import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL ?? 'https://xuhajoppozfuonsobfgs.supabase.co', process.env.SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1aGFqb3Bwb3pmdW9uc29iZmdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY0MzI1NzcsImV4cCI6MjAyMjAwODU3N30.izzLZ7pHnm7fW1opzkZRTEODK3tE68mPFXDN4BzmMoc');

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