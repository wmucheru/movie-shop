FROM mongo:5.0.2

COPY movies.json /movies.json

CMD mongoimport --host mongo-db --db=movie-shop --collection=movies --file=/movies.json --jsonArray