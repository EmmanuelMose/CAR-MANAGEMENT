CREATE TYPE "public"."role" AS ENUM('admin', 'user');--> statement-breakpoint
ALTER TABLE "customer" ADD COLUMN "Role" "role" DEFAULT 'user';