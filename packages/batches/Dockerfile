# WARN - This Dockerfile is intened to be used from the project root context.
#        Execute it from the root with `docker compose up` command.
FROM node:lts-iron

WORKDIR /app

COPY  . .

RUN npm ci --ignore-scripts

RUN npm run prisma:generate -w packages/data

RUN npm run build

EXPOSE $PORT

ENTRYPOINT ["./packages/batches/scripts/start.sh"]
