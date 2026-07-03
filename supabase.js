alert("1");

const SUPABASE_URL = "https://azqtynfqhpkyciehlkwh.supabase.co";

alert("2");

const SUPABASE_KEY = "sb_publishable_zsAmQR8Hu00frIBoRPebCA_A6GxX8dL";

alert("3");

const client = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

alert("4");

window.supabaseClient = client;

alert("5");
