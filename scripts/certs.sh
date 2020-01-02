#!/bin/bash
set -eo pipefail

mkdir -p ssl
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
  -keyout ssl/localhost-privkey.pem -out ssl/localhost-cert.pem

# https://apple.stackexchange.com/a/80625
sudo security add-trusted-cert -d -r trustRoot -k \
  /Library/Keychains/System.keychain ssl/localhost-cert.pem

