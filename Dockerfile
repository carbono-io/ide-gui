FROM node:0.12

RUN npm install -g gulp
RUN mkdir /code
WORKDIR /code

EXPOSE 4000 4001 4002

ENTRYPOINT ["/bin/bash"]