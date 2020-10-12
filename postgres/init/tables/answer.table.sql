CREATE TABLE IF NOT EXISTS "Answer" (
	"id" serial,
	"quiz_id" integer,
	"question_id" integer,
	"correct" boolean,
	PRIMARY KEY( id )
);
