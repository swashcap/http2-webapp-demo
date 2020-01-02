#!/bin/sh

# Prune devDependencies
# https://github.com/yarnpkg/yarn/issues/696
DEV_DEPS=$(node -pe 'Object.keys(require("./package.json").devDependencies).join(" ")')
yarn remove $DEV_DEPS --no-lockfile
