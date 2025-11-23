import { createClient } from '@supabase/supabase-js';

// Hardcoded for immediate stability
const supabaseUrl = 'https://vtvdbmjskdehcqqdaneh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0dmRibWpza2RlaGNxcWRhbmVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MTE3ODEsImV4cCI6MjA3OTI4Nzc4MX0.aeGjFvhKY-aMhFkL1D9pZXFjs_zakIXoo3w_L70bY8U';

export const supabase = createClient(supabaseUrl, supabaseKey);
