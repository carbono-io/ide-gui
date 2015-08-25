#!/bin/bash

set -ex

npm install
bower install
docker build -t local/ide .
