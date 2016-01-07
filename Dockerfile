FROM ubuntu:latest
MAINTAINER Francois Dazan

RUN apt-get update
# Installing nginx, php and dependencies
RUN apt-get -y install nginx wget git

# Installing supervisor
RUN apt-get -y install supervisor

# Adding the configuration file for Nginx and Supervisor
ADD nginx.conf /etc/nginx/nginx.conf
ADD default.conf /etc/nginx/conf.d/default.conf
ADD supervisord.conf /etc/

#Installing Nodejs
WORKDIR /
RUN wget https://nodejs.org/dist/v5.3.0/node-v5.3.0-linux-x64.tar.gz
RUN mkdir /nodejs
RUN tar -xvf node-v5.3.0-linux-x64.tar.gz -C /nodejs

# Set the port to 80
EXPOSE 80

# Start script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /*.sh

# Executing supervisord
ENTRYPOINT ["/entrypoint.sh"]

# Executing supervisord
CMD ["supervisord", "-n"]
