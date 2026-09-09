# base image
FROM node:20 
# docker mein aik working directory bnaye gi
WORKDIR /app  
# sary packages working directory mein copy ho gi
# hum Copy . . bhi kr skty hain lekin is ka size bara hota hai
COPY package*.json ./
# npm install package-lock ko ya create krta hai ya update & good for development
# humy npm ci use krna chahiye ye fast hai & good for production
RUN npm install
# copies everything
# file size zada hota hai is sy so we use build mode use krty hain
COPY . .

EXPOSE 5173
# vite use kr rahy hain tou ye sb likhna hoga
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
