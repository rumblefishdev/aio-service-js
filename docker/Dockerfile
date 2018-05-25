FROM node:9.11.1

RUN apt-get -y update &&\
    apt-get -y upgrade &&\
    apt-get install build-essential -y &&\
    yarn global add node-gyp

RUN mkdir -p /app
ADD . /app

WORKDIR /app
