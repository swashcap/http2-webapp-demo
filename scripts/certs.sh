#!/bin/bash
set -eo pipefail

mkdir -p ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -subj '/CN=localhost:4000' \
  -keyout ssl/localhost.key -out ssl/localhost.crt

# https://apple.stackexchange.com/a/80625
sudo security add-trusted-cert -d -r trustRoot -k \
  /Library/Keychains/System.keychain ssl/localhost.crt

