-- Run this SQL in Supabase → SQL Editor → New Query

CREATE TABLE IF NOT EXISTS "uploadedFile" (
  id TEXT PRIMARY KEY,
  "fileName" TEXT NOT NULL,
  "fileSize" BIGINT NOT NULL,
  "fileType" TEXT NOT NULL,
  "fileUrl" TEXT NOT NULL,
  "userEmail" TEXT NOT NULL,
  "userName" TEXT,
  password TEXT DEFAULT '',
  "shortUrl" TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Allow public read/write access (since RLS is disabled)
-- This is fine for a portfolio/practice app
