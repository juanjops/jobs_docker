For creating without using docker compose:

- Crete a network, in this case jpardosi, 

    `docker network create -d bridge jpardosi`
- Launch server service

    `docker run --name server --network="jpardosi" --env-file ENV_FILE.env server:1.0.0`
- Launch scraping service, remember that both the ENV_FILE and the datasciences.js must be where the docker run is executed

    `docker run -i --init --rm --cap-add=SYS_ADMIN --network="jpardosi" --env-file ENV_FILE.env -e 
    POST_URL=http://server:8000/datasciences --name scraping scraping:1.0.0 node -e "`cat datasciences.js`"`


Each of the ENV_FILE is different for each service, 

for server the ENV_FILE must contain SERVER_PORT, MONGODB_URL

for scraping the ENV_FILE must contain PROXY, USER, PASSWORD, EXPERIENCE, KEY_WORDS, LOCATION, TIME_RANGE, POST_URL
The EXPERIENCE must be a string separated with comma without spaces and in this order of appeareace:

    "Internship": 1,
    "Entry level": 2,
    "Associate": 3,
    "Mid-Senior level": 4,
    "Director": 5,
    "Executive": 6
Example: Internship,Associate

The variable POST_URL is put in the docker command not in the env_file to check the server service 

for crontab with docker every file and program must use the absolute route, for example every day at 21:44

`44 21 * * * /usr/bin/docker run -i --init --rm --cap-add=SYS_ADMIN --network="jpardosi" 
--env-file /home/jpardosi/Projects/docker/jobs/scraping/ENV_FILE.env 
-e POST_URL=http://server:8000/datasciences --name scraping scraping:1.0.0 
node -e "`cat /home/jpardosi/Projects/docker/jobs/scraping/datasciences.js`"`

For creating with using docker compose:

 use the docker-compose.yml