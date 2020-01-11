# alpine has a sh shell
FROM node:12 as builder

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

RUN cp ./package*.json ./build

RUN cd ./build && npm ci --only=production

# RUN find -maxdepth 1 ! -name build ! -name . -exec rm -rf {} \;

FROM node:12

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/build .

RUN pwd

COPY ./entrypoint.sh .

RUN chmod 755 ./entrypoint.sh

RUN ls -al

ENTRYPOINT ["./entrypoint.sh"]
