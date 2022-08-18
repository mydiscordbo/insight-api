FROM node:8-alpine

RUN apk add --update --no-cache \
                            git \
                            libzmq \
                            zeromq-dev \
                            python \
                            make \
                            g++

WORKDIR /insight

# Copy vkaxcore-node
RUN git clone --branch master --single-branch --depth 1 https://github.com/vkaxevo/vkaxcore-node.git .

# Copy config file
COPY vkaxcore-node.json .

ARG VERSION

# Install npm packages
RUN npm ci

# Install Insight API module
RUN bin/vkaxcore-node install @vkaxevo/insight-api@${VERSION}

FROM node:8-alpine

LABEL maintainer="Dash Developers <dev@dash.org>"
LABEL description="Dockerised Insight API"

WORKDIR /insight

# Copy project files
COPY --from=0 /insight/ .

EXPOSE 3001

CMD ["bin/vkaxcore-node", "start"]
