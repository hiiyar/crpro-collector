FROM node
LABEL Assisneto Damasceno, Lucas Reis
COPY . /var/crpro
WORKDIR /var/crpro
RUN yarn install
ENTRYPOINT yarn dev
EXPOSE 3000