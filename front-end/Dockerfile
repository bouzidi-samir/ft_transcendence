FROM node:16.13.1

EXPOSE 3000

# RUN npm install --save qrcode
# RUN npm i --save-dev @types/qrcode
# RUN npm install --save speakeasy
COPY ./script.sh ./
COPY  . .

# RUN npm run build

CMD ["bash", "script.sh"]