CREATE TABLE IF NOT EXISTS "Quiz" (
	"id" serial,
	"user_id" integer,
	"mode" smallint,
	PRIMARY KEY( id )
);