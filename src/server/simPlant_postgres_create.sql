-- command to connect to db and run script that creates tables
-- psql -d <elephant-url> -f src/server/simPlant_postgres_create.sql




-- plants
-- add common name to plant
-- add temperature range /maybe
CREATE TABLE public.plants (
  "_id" serial NOT NULL,
  "species" varchar NOT NULL,
  "watering_frequency_per_week" int NOT NULL,
  "humidity" int NOT NULL,
  "light" int NOT NULL,
  "user_id" bigint NOT NULL,
  "room_id" bigint NOT NULL,
  CONSTRAINT "plants_pk" PRIMARY KEY ("_id")
);
-- room
CREATE TABLE public.room (
  "_id" serial NOT NULL,
  "name" varchar NOT NULL,
  "light" int NOT NULL,
  "humidity" int NOT NULL,
  "temperature" int NOT NULL,
  "user_id" bigint NOT NULL,
  CONSTRAINT "room_pk" PRIMARY KEY ("_id")
);
-- user
CREATE TABLE public.user (
    "_id" serial NOT NULL,
    "username" varchar NOT NULL UNIQUE,
    "password" varchar NOT NULL,
    CONSTRAINT "user_pk" PRIMARY KEY ("_id")
);
-- day
CREATE TABLE public.day (
    "_id" serial NOT NULL,
    "day_num" integer NOT NULL,
    "user_id" bigint NOT NULL,
    CONSTRAINT "day_pk" PRIMARY KEY ("_id")
);
-- plant watering
CREATE TABLE public.plant_watering (
    "_id" serial NOT NULL,
    "plants_id" bigint NOT NULL,
    "day_id" bigint NOT NULL,
    CONSTRAINT "plant_watering_pk" PRIMARY KEY ("_id")
);

-- plants foreign keys
ALTER TABLE public.plants ADD CONSTRAINT "plants_fk0" FOREIGN KEY ("user_id") REFERENCES public.user("_id");
ALTER TABLE public.plants ADD CONSTRAINT "plants_fk1" FOREIGN KEY ("room_id") REFERENCES public.room("_id");
-- room foreign key
ALTER TABLE public.room ADD CONSTRAINT "room_fk1" FOREIGN KEY ("user_id") REFERENCES public.user("_id");
-- day foreign key
ALTER TABLE public.day ADD CONSTRAINT "day_fk0" FOREIGN KEY ("user_id") REFERENCES public.user("_id");
-- plant_watering foreign keys
ALTER TABLE public.plant_watering ADD CONSTRAINT "plant_watering_fk0" FOREIGN KEY ("plants_id") REFERENCES public.plants("_id");
ALTER TABLE public.plant_watering ADD CONSTRAINT "plant_watering_fk1" FOREIGN KEY ("day_id") REFERENCES public.day("_id");

