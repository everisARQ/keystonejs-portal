#!/bin/bash
export MONGO_URI="mongodb://${DB_PORT_27017_TCP_ADDR}/keystonejs-portal"
echo $MONGO_URI
node -v
npm -v
npm start
