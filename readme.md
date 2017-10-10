# Un-RESTful -> RESTful

This repository contains a very un-RESTful API. Pass the tests by changing each route into its RESTful version. For each route you may:

- Update the methods
- Update the status codes
- Update the paths

This repository makes use of the following packages:

- [lodash](https://lodash.com)
- [uuid](https://www.npmjs.com/package/uuid)

## Setup

1. Fork and clone this repository
1. Run `npm install` or `yarn`
1. Run the tests with `npm test`
1. Run the server in development mode with `npm run dev` or run it in production mode with `npm start`

teas
   index
     ✓ should return all of the requested resources (48ms)
   show
     ✓ should return the resource specified if it exists
     ✓ should return a 404 if the specified resource does not exist
   create
     ✓ should create a new tea if the information provided is correct
     ✓ should return a 400 if the information provided is incorrect or invalid
   update
     ✓ should update an existing tea when given correct information and a correct id
     ✓ should return a 400 if the information is invalid
     ✓ should return a 404 if the id does not match an existing tea
   destroy
     ✓ should destroy an existing resource if the id matches
     ✓ should return a 404 if the id does not match an existing tea


 10 passing (118ms)
