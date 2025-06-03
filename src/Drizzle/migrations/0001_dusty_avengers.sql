ALTER TABLE "customer" ADD COLUMN "is_verified" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "customer" ADD COLUMN "VerificationCode" varchar(50);