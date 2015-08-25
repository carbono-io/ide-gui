#!/bin/bash

set -e

if [[ $DOCKER_REGISTRY != "10.0.1.120:500" ]]; then
	echo "Esse script necessita da variável de ambiente DOCKER_REGISTRY.";
	echo "Utilize o comando abaixo para resolver o problema:";
	echo "    * export DOCKER_REGISTRY=10.0.1.120:5000";
	echo;
	echo "Certifique-se também de que esta máquina esta conectada em nossa VPN."

	exit 1;
fi

set -x

npm install
bower install
docker build -t $DOCKER_REGISTRY/ide .
docker push $DOCKER_REGISTRY/ide