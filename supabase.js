import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://azqtynfqhpkyciehlkwh.supabase.co";
const supabaseKey = "YOUR_ANON_KEY";

window.supabase = createClient(supabaseUrl, supabaseKey);

alert("Supabase Connected!");
