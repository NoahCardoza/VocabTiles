CREATE TABLE IF NOT EXISTS "quiz" (
	"id" serial,
	"user_id" numeric(9,2),
	"actual_score" numeric(9,2),
	"max_score" numeric(9,2),
	PRIMARY KEY( id )
);