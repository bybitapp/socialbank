[![CircleCI](https://circleci.com/gh/sbidolach/socialbank/tree/master.svg?style=svg&circle-token=d1c3483a5035420a95bcf103fd40d19a53df7a78)](https://circleci.com/gh/sbidolach/socialbank/tree/master)

# SoTec

This application allows creating bank account by one click. Each account can be shared with donors to build transparency and accountability.

## The Open Payments Cloud

A full set of guidance documents including snippets of example code can be found https://doc.openpayments.cloud/

## Requirements

* NodeJS >= v7.0
* Material Design Lite (https://getmdl.io/)
* React (https://facebook.github.io/react/)
* Redux
* Open Payments Cloud (https://github.com/ixaris/ope-applicationclients/tree/master/js-client)
* MongoDB (https://www.mongodb.com/)

## How to run

* Run `yarn build`
* Run `yarn start`
* Open webpage `http://localhost:3001`

## Hot to run development mode

* Run `yarn dev` (When you run in dev mode then there isn't access to server implementation, but it allows quickly write changes on front-end site)
* Open webpage `http://localhost:3000`

| Override PORT on machine by setting ```PORT=8080``` in your root directory ```.env``` file

## How set FriendlyName in OPC API

Full names and descriptions should be stored in our internal database

* External Accounts   - SOCIALBANK.uuid()
* Managed Accounts    - SOCIALBANK.uuid()
* Virtual Cards       - SOCIALBANK.uuid()
