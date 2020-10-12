CREATE TABLE IF NOT EXISTS "Question" (
  "id" serial,
  "category_id" integer,
  "text" text,
  "audio" text,
  "color" text,
  "image" text,
  PRIMARY KEY( id )
);
