-- Table: public.statuses

-- DROP TABLE public.statuses;

CREATE TABLE public.statuses
(
    device_id character varying COLLATE pg_catalog."default",
    temperature real,
    humidity real,
    status character varying(3) COLLATE pg_catalog."default",
    id integer NOT NULL DEFAULT nextval('statuses_id_seq'::regclass),
    date timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT statuses_pkey PRIMARY KEY (id),
    CONSTRAINT device_id FOREIGN KEY (device_id)
        REFERENCES public.devices (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.statuses
    OWNER to xvzlfxmmanetat;
