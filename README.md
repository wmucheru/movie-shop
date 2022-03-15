# Online Movie Shop

Simple web application:

- Frontend: React
- Backend: Express
- Database: MongoDB
- ORM: Mongoose

### Setup

DOCKER

- Run `docker-compose up -d` to start the app
- Environments variables hardcoded into `docker-compose.yml` file
- Launch frontend at [http://localhost:3000](http://localhost:3000)

NODE Option

- Update backend environment variables:
- Frontend: `cd frontend && yarn install && yarn start`: [http://localhost:3000](http://localhost:3000)
- Backend: `cd backend && npm install && npm start`: [http://localhost:8000](http://localhost:8000)
- Set up and start your local mongdb instance: port `27017`

### Login Usernames

- `admin`: Admin
- `macro`: Customer
