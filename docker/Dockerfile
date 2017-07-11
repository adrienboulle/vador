FROM debian:jessie

RUN apt-get check -y
RUN apt-get update -y
RUN apt-get install -y curl build-essential git

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -

RUN apt-get install -y nodejs
