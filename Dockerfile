FROM node:19.4.0

WORKDIR /usr/app
EXPOSE 3000

RUN npm install -g bun
RUN npm install -g concurrently
RUN npm install -g ts-node

COPY ./ ./

RUN bun run setup
RUN bun run build

CMD [ "npm", "run", "start" ]
