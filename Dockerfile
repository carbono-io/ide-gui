FROM node:0.10.39

# Bit chunck of commands creates a user and a group
# called ide and changes the owner of the /src folder
# which now is the home directory of the ide user.
RUN mkdir /src && \
    groupadd -r ide -g 433 && \
    useradd -u 431 -r -g ide -d /src -c "IDE user" ide && \
    chown -R ide:ide /src

WORKDIR /src
ADD . /src
RUN npm install -g gulp
USER ide
EXPOSE 3000
