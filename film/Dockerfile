FROM node:20

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .
# RUN npx cross-env HTTPS=true npm run build
# RUN npm run build

CMD ["npm", "start"]