FROM denoland/deno:alpine

#  using bcrypt from npm requires gcc and musl-dev installed
RUN apk update && apk add --no-cache \
gcc \
musl-dev 
# libc-dev \
# make \
# git \
# curl

WORKDIR /app

COPY . .

# RUN musl-gcc -shared -o libexample.so -fPIC example.c

EXPOSE 8000

CMD sh -c "if [[ \"$ENV\" == "development" ]]; then deno task dev; else deno task prod; fi"