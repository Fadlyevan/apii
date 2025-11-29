import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

// ===============================
// SETUP SUPABASE
// ===============================
const supabase = createClient(
    "https://msbgvezndwgxroygwacg.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zYmd2ZXpuZHdneHJveWd3YWNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0ODUzNDEsImV4cCI6MjA3OTA2MTM0MX0.NL4ewKWgenehCzzEVOWQtW6iYj07PgsMGt73dGL9oGs"
);

// ===============================
// GET ALL SURAH
// ===============================
app.get("/api/surah", async (req, res) => {
  const { data, error } = await supabase
      .from("surah")
      .select("*")
      .order("id");

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
});

// ===============================
// GET SURAH DETAIL + AYAT
// ===============================
app.get("/api/surah/:id", async (req, res) => {
  const id = req.params.id;

  const { data: surah, error: errSurah } = await supabase
      .from("surah")
      .select("*")
      .eq("id", id)
      .single();

  const { data: ayah, error: errAyah } = await supabase
      .from("ayah")
      .select("*")
      .eq("surah_id", id)
      .order("ayah_number");

  if (errSurah || errAyah) {
    return res.status(500).json({ error: "Gagal ambil data surah/ayah" });
  }

  res.json({ surah, ayah });
});

// ===============================
// GET AYAT PER JUZ
// ===============================
app.get("/api/juz/:id", async (req, res) => {
  const id = req.params.id;

  const { data, error } = await supabase
      .from("ayah")
      .select("*")
      .eq("juz", id)
      .order("surah_id", { ascending: true })
      .order("ayah_number", { ascending: true });

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
});

// ===============================
// TEST API ROOT
// ===============================
app.get("/", (req, res) => {
  res.send("✅ Quran API aktif");
});

// ===============================
// JALANKAN SERVER
// ===============================
app.listen(3000, () => {
  console.log("✅ Quran API berjalan di http://localhost:3000");
});
