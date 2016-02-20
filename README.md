# keystonejs-portal

## PRE-REQUISITES
- mongodb

## INSTALL
1. npm install
2. rename .env_test to .env

## RUN
To run view _gulp help_

**RECOMENDATION**: use node ~4.2.0 || ~4.3.0 version.

# Tools and Other things

## Docker
For now, there is no container with the keystonejs-portal. For this reason, to use keystonejs-portal in a docker 
container you should do the following steps:

1. Creates a keystonejs-portal image:

	``docker build -t keystonejs-portal keystonejs-portal/``
2. Creates a mongodb container:

	``docker run -d --name mongodb mongo``
3. Creates a container linked with mongodb:

	``docker run -d --link mongodb:db -p 3000:3000 --name keystonejs-portal keystonejs-portal``

## Git
To work with git, we recommend using command line. If you prefer a GUI, recently we have discovered a great GUI 
[gitkracken](http://www.gitkraken.com/) (of course builded in electron, other javascript framework). 
Also, to manage branching, we use typical GiFlow.
