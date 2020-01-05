#!/bin/bash
set -eo pipefail

CERT_FILENAME="ssl/localhost.crt"
KEY_FILENAME="ssl/localhost.key"

if [ -f "$CERT_FILENAME" ] && [ -f "$KEY_FILENAME" ]; then
  echo "Certificate already exist"
  echo "Skipping certificate generation"
  exit
fi

# Generate certificates through the nginx:latest image, which will serve them
# https://www.freecodecamp.org/news/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec/
echo "Generating certificate"

docker run --rm -t -v "$PWD/ssl":/ssl nginx:latest /bin/bash -c \
  "apt update &&
  apt-get install -y openssl &&
  openssl req -new -newkey rsa:4096 -days 365 -nodes -x509 \
    -config /ssl/localhost.ini \
    -keyout $KEY_FILENAME -out $CERT_FILENAME"
echo "Certificate generation complete"

# https://apple.stackexchange.com/a/80625
echo "Run this to trust the certificate:"
echo ""
echo "  sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain $CERT_FILENAME"
# -subj '/C=US/ST=Oregon/L=Portland/O=Example/CN=localhost:4000' \
