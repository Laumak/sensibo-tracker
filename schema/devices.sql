-- Table: public.devices

-- DROP TABLE public.devices;

CREATE TABLE public.devices
(
    id character varying COLLATE pg_catalog."default" NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT devices_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.devices
    OWNER to xvzlfxmmanetat;
