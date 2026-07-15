# Week 5 - Database Design & Management

## Database Choice
MongoDB Atlas with Mongoose

## Why MongoDB?
MongoDB is easy to use with Node.js and provides a flexible schema for storing data.

## Schema Design

### Task Entity
- title (String)
- description (String)
- status (String)

## Project Setup

1. Install dependencies

```bash
npm install
```

2. Run the server

```bash
node server.js
```

## Environment Variables

Create a `.env` file and add:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```