FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
# kon si main file hai wo likhni hai
CMD ["npm", "index.js"]
