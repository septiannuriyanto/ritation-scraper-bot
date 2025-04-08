// src/handlers/messageHandler.ts

import { parseRitasiReport } from '../parser';
import { insertRitasi } from '../supabase';


const formatDateForSupabase = (date: Date) => {
  if (!date) return null;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-based month, so add 1
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export async function handleMessage(message: string, timestamp: number) {
  // Format tanggal: YYYY-MM-DD
  const reportDate = formatDateForSupabase(new Date());

  const entries = parseRitasiReport(message);
  if (entries.length === 0) {
    console.log('⛔ No valid ritasi data found in message.');
    return;
  }

  console.log('📦 Parsed entries:', entries);
  await insertRitasi(entries, reportDate!);
}
