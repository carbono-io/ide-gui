FROM node:0.10.39

# Bit chunck of commands creates a user and a group
# called ide and changes the owner of the /src folder
# which now is the home directory of the ide user.
RUN mkdir /src && \
    groupadd -r ide -g 433 && \
    useradd -u 431 -r -g ide -d /src -c "IDE user" ide

# When bower is run, it asks if you wanna send
# statistics to them. This breaks up all the automation
# flow. So by exporting an environment variable called
# CI, bower won't ask about statistics again.
ENV CI true

WORKDIR /src
ADD . /src
RUN npm install && \
	npm install -g gulp && \
	npm install -g bower && \
	chown -R ide:ide /src

USER ide
RUN bower install

EXPOSE 3000
