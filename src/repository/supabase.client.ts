import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://otxhrbsfcrkajaljaips.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90eGhyYnNmY3JrYWphbGphaXBzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDc2MzkwOSwiZXhwIjoyMDY2MzM5OTA5fQ.nTDMEhkmQXh5-Adh_d4VFmqREBgM6GxaenaprzLuBAo';

export const supabase = createClient(supabaseUrl, supabaseKey);
