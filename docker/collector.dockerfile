FROM node
LABEL Assisneto Damasceno, Lucas Reis
COPY . /var/crpro
WORKDIR /var/crpro
RUN yarn install
ENTRYPOINT yarn start
EXPOSE 3000