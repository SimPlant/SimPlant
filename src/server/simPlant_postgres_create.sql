-- command to connect to db and run script that creates tables
-- psql -d <elephant-url> -f src/server/simPlant_postgres_create.sql

-- plants
CREATE TABLE public.plants (
  "_id" serial NOT NULL,
  "species" varchar NOT NULL,
  "watering_schedule_id" bigint NOT NULL,
  "humidity" int NOT NULL,
  "temperature" int NOT NULL,
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
-- userhu
CREATE TABLE public.user (
    "_id" serial NOT NULL,
    "username" varchar NOT NULL UNIQUE,
    "password" varchar NOT NULL,
    CONSTRAINT "user_pk" PRIMARY KEY ("_id")
);
-- -- day
-- CREATE TABLE public.day (
--     "_id" serial NOT NULL,
--     "day_num" integer NOT NULL,
--     "user_id" bigint NOT NULL,
--     CONSTRAINT "day_pk" PRIMARY KEY ("_id")
-- );
-- -- plant watering
-- CREATE TABLE public.plant_watering (
--     "_id" serial NOT NULL,
--     "plants_id" bigint NOT NULL,
--     "day_id" bigint NOT NULL,
--     CONSTRAINT "plant_watering_pk" PRIMARY KEY ("_id")
-- );

-- watering_schedule
CREATE TABLE public.watering_schedule (
  "_id" serial NOT NULL,
  "monday" boolean NOT NULL,
  "tuesday" boolean NOT NULL,
  "wednesay" boolean NOT NULL,
  "thursday" boolean NOT NULL,
  "friday" boolean NOT NULL,
  "saturday" boolean NOT NULL,
  "sunday" boolean NOT NULL,
  CONSTRAINT "watering_schedule_pk" PRIMARY KEY ("_id")
)

-- plants foreign keys
ALTER TABLE public.plants ADD CONSTRAINT "plants_fk0" FOREIGN KEY ("user_id") REFERENCES public.user("_id");
ALTER TABLE public.plants ADD CONSTRAINT "plants_fk1" FOREIGN KEY ("room_id") REFERENCES public.room("_id");
ALTER TABLE public.plants ADD CONSTRAINT "plants_fk2" FOREIGN KEY ("watering_schedule_id") REFERENCES public.watering_schedule("_id");
-- room foreign key
ALTER TABLE public.room ADD CONSTRAINT "room_fk0" FOREIGN KEY ("user_id") REFERENCES public.user("_id");








-- -- day foreign key
-- ALTER TABLE public.day ADD CONSTRAINT "day_fk0" FOREIGN KEY ("user_id") REFERENCES public.user("_id");

-- -- plant_watering foreign keys
-- ALTER TABLE public.plant_watering ADD CONSTRAINT "plant_watering_fk0" FOREIGN KEY ("plants_id") REFERENCES public.plants("_id");
-- ALTER TABLE public.plant_watering ADD CONSTRAINT "plant_watering_fk1" FOREIGN KEY ("day_id") REFERENCES public.day("_id");

