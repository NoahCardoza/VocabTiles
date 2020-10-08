CREATE TABLE IF NOT EXISTS "quiz" (
	"id" serial,
	"user_id" integer,
	"actual_score" smallint,
	"max_score" smallint,
	PRIMARY KEY( id )
);