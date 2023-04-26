-- command to connect to db and run script that creates tables
-- psql -d <elephant-url> -f src/server/simPlant_postgres_create.sql




-- plants
-- add common name to plant
-- watering frequency 1-3
CREATE TABLE public.plants (
  "_id" serial NOT NULL,
  "nickname" varchar,
  "species" varchar NOT NULL,
  "common_name" varchar NOT NULL,
  "watering_frequency" int NOT NULL,
  "days_between_watering" int NOT NULL,
  "full_sun" boolean NOT NULL,
  "part_sun" boolean NOT NULL,
  "full_shade" boolean NOT NULL,
  "notes" varchar,
  "image" varchar,
  "user_id" bigint NOT NULL,
  "room_id" bigint NOT NULL,
  CONSTRAINT "plants_pk" PRIMARY KEY ("_id")
);

-- room
CREATE TABLE public.rooms (
  "_id" serial NOT NULL,
  "name" varchar NOT NULL,
  "light" int NOT NULL,
  "user_id" bigint NOT NULL,
  CONSTRAINT "room_pk" PRIMARY KEY ("_id")
);

-- user
CREATE TABLE public.users (
    "_id" serial NOT NULL,
    "username" varchar NOT NULL UNIQUE,
    "password" varchar NOT NULL,
    CONSTRAINT "user_pk" PRIMARY KEY ("_id")
);


-- plants foreign keys
ALTER TABLE public.plants ADD CONSTRAINT "plants_fk0" FOREIGN KEY ("user_id") REFERENCES public.user("_id");
ALTER TABLE public.plants ADD CONSTRAINT "plants_fk1" FOREIGN KEY ("room_id") REFERENCES public.room("_id");
-- room foreign key
ALTER TABLE public.rooms ADD CONSTRAINT "room_fk1" FOREIGN KEY ("user_id") REFERENCES public.user("_id");
-- room constraint
ALTER TABLE public.rooms ADD CONSTRAINT 'room_unique' UNIQUE ("col1", "col2")

