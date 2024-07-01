#!/usr/bin/env sh

npm run prisma:generate -w packages/data --if-present

npm run prisma:migrate:deploy -w packages/data --if-present

npm run  dev -w packages/batches
