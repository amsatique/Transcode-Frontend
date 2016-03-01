FROM ubuntu:latest
MAINTAINER Francois Dazan

# Installing dependencies
RUN apt-get update && \
    apt-get -y install curl wget git g++ make python-dev build-essential

# Installing nodejs
RUN curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash - && \
    apt-get -y install nodejs

# Copy app to container
COPY app /app
COPY pushbullet.sh /pushbullet.sh

# Set the port to 80
EXPOSE 80

# Start script

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /*.sh


# Executing entrypoint
ENTRYPOINT ["/entrypoint.sh"]

# Executing node
CMD ["npm", "start"]
