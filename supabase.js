const SUPABASE_URL = "https://azqtynfqhpkyciehlkwh.supabase.co";
const SUPABASE_KEY = "sb_publishable_zsAmQR8Hu00frIBoRPebCA_A6GxX8dL";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

window.supabase = supabase;

alert("Supabase Connected");
