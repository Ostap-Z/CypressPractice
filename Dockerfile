FROM cypress/browsers:node-20.11.0-chrome-121.0.6167.85-1-ff-120.0-edge-121.0.2277.83-1

WORKDIR /conduit

COPY . .

RUN npm install
