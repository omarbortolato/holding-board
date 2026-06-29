FROM nginx:1.25-alpine

RUN apk add --no-cache openssl && \
    mkdir -p /etc/nginx/ssl && \
    openssl req -x509 -nodes -days 3650 -newkey rsa:2048 \
      -keyout /etc/nginx/ssl/selfsigned.key \
      -out    /etc/nginx/ssl/selfsigned.crt \
      -subj   '/CN=chat.herbago.info/O=Herbalife/C=IT'

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
