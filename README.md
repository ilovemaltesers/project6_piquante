# Project6 Piquante

## Description

This project is a web application for managing a collection of spicy sauces. Users can add, edit, and delete sauces, as well as rate them.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/).
- You have a MongoDB Atlas account and a cluster set up.

## Installation

To install the project, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/ilovemaltesers/project6_piquante.git
   ```

2. Navigate to the project directory:

   ```sh
   cd project6_piquante
   ```

3. Install the dependencies:
   ```sh
   npm install
   ```

## Configuration

To configure the project, follow these steps:

1. Create a `.env` file in the root of the `backend` folder with the following information:

   ```plaintext
   DB_USER=SaraRead
   DB_PASSWORD=1cITxDC2qg6LqD3K
   DB_HOST=cluster0.bkyxzv9.mongodb.net
   PORT=4200
   ```

2. If you are using the MongoDB plugin or need the connection string to connect to the database, use the following:
   ```plaintext
   mongodb+srv://SaraRead:1cITxDC2qg6LqD3K@cluster0.bkyxzv9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```

## Running the Project

To start the project, follow these steps:

1. Navigate to the `backend` directory:

   ```sh
   cd backend
   ```

2. Start the server:

   ```sh
   npm start
   ```

3. The server will be running on port 4200. You can access it at `http://localhost:4200`.

## Testing

To run tests, follow these steps:

1. Navigate to the `backend` directory:

   ```sh
   cd backend
   ```

2. Run the tests:
   ```sh
   npm test
   ```

## Usage

To use the project, follow these steps:

1. Open your browser and navigate to `http://localhost:4200`.
2. Use the web interface to add, edit, delete, and rate sauces.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
