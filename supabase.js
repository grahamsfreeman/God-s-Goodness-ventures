import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://azqtynfqhpkyciehlkwh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6cXR5bmZxaHBreWNpZWhsa3doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwNjEzNDAsImV4cCI6MjA5ODYzNzM0MH0.VufO48qa-2z1uubZPUVgfULv66HjjklJ6gWCqr3AhZQ";

export const supabase = createClient(supabaseUrl, supabaseKey);

