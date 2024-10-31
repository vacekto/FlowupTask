FROM denoland/deno:alpine

WORKDIR /app

COPY . .

RUN deno install -qAf --global --unstable https://deno.land/x/denon/denon.ts

EXPOSE 8000

CMD sh -c "if [[ \"$ENV\" == "development" ]]; then deno task dev; else deno task prod; fi"