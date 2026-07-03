const SUPABASE_URL = "https://azqtynfqhpkyciehlkwh.supabase.co";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6cXR5bmZxaHBreWNpZWhsa3doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwNjEzNDAsImV4cCI6MjA5ODYzNzM0MH0.VufO48qa-2z1uubZPUVgfULv66HjjklJ6gWCqr3AhZQ";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

alert("Supabase Connected!");
