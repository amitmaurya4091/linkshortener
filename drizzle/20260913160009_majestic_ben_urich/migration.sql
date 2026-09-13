CREATE TABLE "links" (
	"id" serial PRIMARY KEY,
	"short_code" text NOT NULL,
	"user_id" text NOT NULL,
	"url" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "links_short_code_unique" ON "links" ("short_code");--> statement-breakpoint
CREATE INDEX "links_user_id_idx" ON "links" ("user_id");