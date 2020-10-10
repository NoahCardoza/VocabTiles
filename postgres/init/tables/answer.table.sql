CREATE TABLE IF NOT EXISTS "Answer" (
	"id" serial,
	"quiz_id" integer,
	"category" text,
	"text" text,
	"correct" boolean,
	PRIMARY KEY( id )
);