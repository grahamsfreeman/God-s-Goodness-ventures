// Supabase Configuration

const SUPABASE_URL = "https://azqtynfqhpkyciehlkwh.supabase.co";

const SUPABASE_KEY = "sb_publishable_zsAmQR8Hu00frIBoRPebCA_A6GxX8dL";

// Create Supabase Client
const client = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// Make it available to every JavaScript file
window.supabaseClient = client;

