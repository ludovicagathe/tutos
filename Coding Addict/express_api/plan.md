# Base installation and dependencies
[*] Node modules
[*] Set up .env variables
  [*] NODE_ENV
  [*] PORT
  [*] MONGO_URI_DEV
  [*] MONGO_URI_PROD
  [*] REDIS_SUPPORT
  [*] NEDB_SUPPORT
[*] Set up Homepage route
[*] Set up default page routes
  [*] /about
  [*] /contact
[*] Set up default error pages (app.all('\*'))
[*] Define app.listen
[*] Initialise test scripts
[ ] Define Tests
  [*] Check environment (dev/prod)
  [ ] Test db connectivity
    [ ] MongoDB
     [*] Access DB
     [ ] Create test document
     [*] Drop test table
     [ ] Create test entries
     [ ] Test CRUD operations on data
    [ ] Redis
      [ ] Access DB
      [ ] Create test document
      [ ] Drop test table
      [ ] Create test entries
      [ ] Test CRUD operations on data
    [ ] NEDB
      [ ] Access DB
      [ ] Create test document
      [ ] Drop test table
      [ ] Create test entries
      [ ] Test CRUD operations on data
  [ ] Clear temporary tables
