import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
if (!process.env.REACT_APP_SUPABASE_URL || !process.env.REACT_APP_SUPABASE_PUBLIC_API) {
    throw new Error('Missing required supabase environment varaibles');
}
// Supabase client setup
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_PUBLIC_API;
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;