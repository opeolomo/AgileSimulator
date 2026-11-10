# Serves the static simulator with nginx. Render supplies PORT (10000 by default).
FROM nginx:1.27-alpine
ENV PORT=10000
COPY deploy/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY index.html /usr/share/nginx/html/
COPY css /usr/share/nginx/html/css
COPY js /usr/share/nginx/html/js
EXPOSE 10000
