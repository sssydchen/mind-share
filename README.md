# Mind Share

This repository contains:

- `frontend`: a Vite + React application
- `backend`: a Spring Boot application

## Prerequisites

Make sure these are installed and running before you start the app:

- Node.js and npm
- Java 21
- MySQL
- Redis

## Local Development Configuration

The app uses these default local services:

- Frontend: `http://localhost:5173`
- Backend: `http://127.0.0.1:8080`
- MySQL: `localhost:3306`
- Redis: `localhost:6379`

Backend development database settings are currently configured as:

- Database: `kamanote_tech`
- Username: `root`
- Password: `password`

## Start the App

Open two terminal windows.

### 1. Start the backend

```bash
cd backend
./mvnw spring-boot:run
```

The backend runs on port `8080`.

### 2. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on port `5173`.

Open this URL in your browser:

```text
http://localhost:5173/
```

## Stop the App

If you started the services in terminal windows, stop them with:

```text
Ctrl + C
```

If a process is still running in the background, find it with:

```bash
lsof -nP -iTCP -sTCP:LISTEN | grep -E '5173|8080|8081'
```

Then stop it with:

```bash
kill <PID>
```

## Common Issues

### `./mvnw: command not found`

Make sure you are in the `backend` directory and use:

```bash
./mvnw spring-boot:run
```

### Frontend starts but API requests fail

Check that:

- the backend started successfully
- MySQL is running
- Redis is running
- the backend is listening on `8080`

### Port already in use

Find the process:

```bash
lsof -nP -iTCP -sTCP:LISTEN | grep -E '5173|8080|8081'
```

Then stop it:

```bash
kill <PID>
```
