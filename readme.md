# Sensibo API powered AC dashboard

Production app can be found from here: https://mcinen-ac-control.herokuapp.com

Props to "Kaffeine" for keeping my free Heroku app awake even when we're not keeping on eye on it: https://kaffeine.herokuapp.com/

## Local development
1. Install packages: `yarn install`
2. Start dev environment: `DATABASE_URL=[PSQL_URL] yarn run dev`

After this you'll find the application on localhost:4000 and the Node debugger on the default port 5858.

## Backups
https://devcenter.heroku.com/articles/heroku-postgres-import-export

### Backup & download
```
heroku pg:backups:capture -a mcinen-ac-control
heroku pg:backups:download -a mcinen-ac-control
```

### Restore dump
```sql
pg_restore --verbose --clean --no-acl --no-owner --host=localhost --username=postgres --dbname=ac_control_local latest.dump
```
