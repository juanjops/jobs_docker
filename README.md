For creating without using docker compose:

- Crete a network, in this case jpardosi, 

    `docker network create -d bridge jpardosi`
- Launch server service

    `docker run --name server --network="jpardosi" --env-file ENV_FILE.env server:1.0.0`
- Launch scraping service

    `docker run -i --init --rm --cap-add=SYS_ADMIN --network="jpardosi" --env-file ENV_FILE.env -e 
    POST_URL=http://server:8000/datasciences --name scraping scraping:1.0.0 node -e "`cat datasciences.js`"`


Each of the ENV_FILE is different for each service, 

for server the ENV_FILE must contain SERVER_PORT, MONGODB_URL

for scraping the ENV_FILE must contain PROXY, USER, PASSWORD, KEY_WORDS, LOCATION, TIME_RANGE, POST_URL
The variable POST_URL is put in the docker command not in the env_file to check the server service 
