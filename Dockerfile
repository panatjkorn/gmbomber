FROM node:14-alpine

WORKDIR /usr/src/nuxt-app

COPY . /usr/src/nuxt-app/

RUN yarn

RUN yarn build

EXPOSE 8080

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0

# set app port
ENV NUXT_PORT=8080

# start the app
CMD [ "yarn", "start" ]
