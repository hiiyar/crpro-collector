FROM node
LABEL Assisneto Damasceno
COPY . /var/crpro
WORKDIR /var/crpro
RUN yarn install
ENTRYPOINT yarn dev
EXPOSE 3000