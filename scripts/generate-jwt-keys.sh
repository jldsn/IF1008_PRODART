#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
CERTS_DIR="$ROOT_DIR/apps/api/gestaoartesaos/src/main/resources/certs"

mkdir -p "$CERTS_DIR"

TMP_KEY="$(mktemp)"
trap 'rm -f "$TMP_KEY"' EXIT

openssl genrsa -out "$TMP_KEY" 2048
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in "$TMP_KEY" -out "$CERTS_DIR/dev-private.key"
openssl rsa -in "$TMP_KEY" -pubout -outform PEM -out "$CERTS_DIR/dev-public.pub"

echo "Chaves JWT de desenvolvimento geradas em:"
echo "  $CERTS_DIR/dev-private.key"
echo "  $CERTS_DIR/dev-public.pub"
