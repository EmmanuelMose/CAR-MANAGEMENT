CREATE TYPE "public"."role" AS ENUM('admin', 'user');--> statement-breakpoint
CREATE TABLE "bookings" (
	"BookingID" serial PRIMARY KEY NOT NULL,
	"CarID" integer NOT NULL,
	"CustomerID" integer NOT NULL,
	"RentalStartDate" date NOT NULL,
	"RentalEndDate" date NOT NULL,
	"TotalAmount" numeric(10, 2)
);
--> statement-breakpoint
CREATE TABLE "car" (
	"carID" serial PRIMARY KEY NOT NULL,
	"carModel" varchar(100) NOT NULL,
	"year" varchar(255) NOT NULL,
	"color" varchar(50) NOT NULL,
	"rentalRate" numeric(10, 2) NOT NULL,
	"availability" boolean DEFAULT true NOT NULL,
	"locationID" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customer" (
	"customerID" serial PRIMARY KEY NOT NULL,
	"FirstName" varchar(50),
	"LastName" varchar(50),
	"Email" varchar(100) NOT NULL,
	"PhoneNumber" text,
	"Password" varchar(255) NOT NULL,
	"Address" varchar(255),
	"is_verified" boolean DEFAULT false,
	"VerificationCode" varchar(50),
	"Role" "role" DEFAULT 'user',
	CONSTRAINT "customer_Email_unique" UNIQUE("Email")
);
--> statement-breakpoint
CREATE TABLE "insurance" (
	"InsuranceID" serial PRIMARY KEY NOT NULL,
	"CarID" integer NOT NULL,
	"InsuranceProvider" varchar(100) NOT NULL,
	"PolicyNumber" varchar NOT NULL,
	"StartDate" date NOT NULL,
	"EndDate" date
);
--> statement-breakpoint
CREATE TABLE "location" (
	"LocationID" serial PRIMARY KEY NOT NULL,
	"LocationName" varchar(100) NOT NULL,
	"Address" text NOT NULL,
	"ContactNumber" varchar(20)
);
--> statement-breakpoint
CREATE TABLE "maintenance" (
	"MaintenanceID" serial PRIMARY KEY NOT NULL,
	"CarID" integer NOT NULL,
	"MaintenanceDate" date NOT NULL,
	"Description" varchar(255),
	"Cost" numeric(10, 2)
);
--> statement-breakpoint
CREATE TABLE "payment" (
	"PaymentID" serial PRIMARY KEY NOT NULL,
	"BookingID" integer NOT NULL,
	"PaymentDate" date NOT NULL,
	"Amount" numeric(10, 2) NOT NULL,
	"PaymentMethod" text
);
--> statement-breakpoint
CREATE TABLE "reservation" (
	"ReservationID" serial PRIMARY KEY NOT NULL,
	"CustomerID" integer NOT NULL,
	"CarID" integer NOT NULL,
	"ReservationDate" date NOT NULL,
	"PickupDate" date NOT NULL,
	"ReturnDate" date
);
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_CarID_car_carID_fk" FOREIGN KEY ("CarID") REFERENCES "public"."car"("carID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_CustomerID_customer_customerID_fk" FOREIGN KEY ("CustomerID") REFERENCES "public"."customer"("customerID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "car" ADD CONSTRAINT "car_locationID_location_LocationID_fk" FOREIGN KEY ("locationID") REFERENCES "public"."location"("LocationID") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "insurance" ADD CONSTRAINT "insurance_CarID_car_carID_fk" FOREIGN KEY ("CarID") REFERENCES "public"."car"("carID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_CarID_car_carID_fk" FOREIGN KEY ("CarID") REFERENCES "public"."car"("carID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment" ADD CONSTRAINT "payment_BookingID_bookings_BookingID_fk" FOREIGN KEY ("BookingID") REFERENCES "public"."bookings"("BookingID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_CustomerID_customer_customerID_fk" FOREIGN KEY ("CustomerID") REFERENCES "public"."customer"("customerID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_CarID_car_carID_fk" FOREIGN KEY ("CarID") REFERENCES "public"."car"("carID") ON DELETE cascade ON UPDATE no action;