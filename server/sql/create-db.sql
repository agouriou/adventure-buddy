create table app_users (
	id integer primary key,
	firstname varchar(40),
	lastname varchar(40),
  phone_number varchar(20)
);

create table alerts (
  app_users_id integer,
  setup_time timestamp with time zone,
  alerting_time timestamp with time zone,
  phone_number varchar(20),
  message text,
  constraint fk_app_users foreign key ( app_users_id ) references app_users ( id )
);

insert into app_users values (0, 'Super', 'Dupont', '+33673208396');

-- setup alert in 10 minutes
insert into alerts values (0, current_timestamp, current_timestamp + time '00:10:00', '+33673208396', 'super test');