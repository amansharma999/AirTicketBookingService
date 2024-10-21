# Booking Service

## Project Overview
The Booking Service is a microservice designed to handle booking operations for a flight reservation system. It provides endpoints for creating bookings, publishing messages to a queue, and retrieving booking information. The service is built using Node.js, Express, and Sequelize for database interactions.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Table of Contents](#table-of-contents)
3. [Setup Instructions](#setup-instructions)
4. [Tools and Technologies](#tools-and-technologies)
5. [Endpoints](#endpoints)
  - [POST /bookings](#create-booking)
  - [GET /bookings/:userId](#get-bookings-by-user)
  - [PATCH /bookings/cancel/:bookingId](#cancel-booking)
  - [POST /publish](#publish-message)
6. [Database Design](#database-design)
   - [Associations](#associations)
   - [Database Diagram](#database-diagram)
7. [Acknowledgements](#acknowledgements)
8. [Contributing](#contributing)


## Tools and Technologies
- **Node.js**: JavaScript runtime.
- **Express**: Web framework for Node.js.
- **Sequelize**: ORM for SQL databases.
- **MySQL**: Relational database.
- **Axios**: Promise-based HTTP client.
- **amqplib**: RabbitMQ client library.
- **dotenv**: Environment variable management.
- **morgan**: HTTP request logger middleware.

## Setup Instructions
1. Clone the repository:
   ```sh
   git clone https://github.com/amansharma999/AirTicketBookingService.git
   cd bookingservice
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=3002
   DB_SYNC=true
   FLIGHT_SERVICE_PATH=path_to_flight_service
   EXCHANGE_NAME=your_exchange_name
   REMINDER_BINDING_KEY=your_binding_key
   MESSAGE_BROKER_URL='amqp://localhost'
   ```

4. Start the service:
   ```sh
   npm start
   ```


## Endpoints
Here are the updated endpoint sections for your README file with full URLs:

### Create Booking

- **URL:** `/bookingservice/api/bookings`
- **Method:** `POST`
- **Body Parameters:**
  - `flightId` (string, required): ID of the flight.
  - `noOfSeats` (number, required): Number of seats to book.
  - `userId` (string, required): ID of the user making the booking.
- **Response:**
  - **Success:** 201 Created
    ```json
    {
      "message": "Successfully completed booking",
      "success": true,
      "err": {},
      "data": {
        "id": "booking_id",
        "flightId": "flight_id",
        "userId": "user_id",
        "noOfSeats": 2,
        "totalCost": 200,
        "status": "Confirmed"
      }
    }
    ```
  - **Error:** 400 Bad Request
    ```json
    {
      "message": "Invalid request data",
      "success": false,
      "err": "Error explanation",
      "data": {}
    }
    ```
  - **Error:** 500 Internal Server Error
    ```json
    {
      "message": "Internal Server Error",
      "success": false,
      "err": "Error explanation",
      "data": {}
    }
    ```

### Get Bookings by User

- **URL:** `/bookingservice/api/bookings/:userId`
- **Method:** `GET`
- **Response:**
  - **Success:** 200 OK
    ```json
    {
      "message": "Successfully fetched bookings",
      "success": true,
      "err": {},
      "data": [
      {
        "flightId": "your_flight_id",
        "status": "your_status",
        "noOfSeats": your_number_of_seats,
        "totalCost": your_total_cost,
        "createdAt": "your_created_at_timestamp"
      }
      ]
    }
    ```
  - **Error:** 400 Bad Request
    ```json
    {
      "message": "User Id is required",
      "success": false,
      "err": {},
      "data": {}
    }
    ```
  - **Error:** 500 Internal Server Error
    ```json
    {
      "message": "Internal Server Error",
      "success": false,
      "err": "Error explanation",
      "data": {}
    }
    ```

### Cancel Booking

- **URL:** `/bookingservice/api/bookings/cancel/:bookingId`
- **Method:** `PATCH`
- **Response:**
  - **Success:** 200 OK
    ```json
    {
      "message": "Successfully cancelled booking",
      "success": true,
      "err": {},
      "data": {
        "id": "booking_id",
        "flightId": "flight_id",
        "userId": "user_id",
        "noOfSeats": 2,
        "totalCost": 200,
        "status": "Cancelled"
      }
    }
    ```
  - **Error:** 400 Bad Request
    ```json
    {
      "message": "Booking Id is required",
      "success": false,
      "err": {},
      "data": {}
    }
    ```
  - **Error:** 500 Internal Server Error
    ```json
    {
      "message": "Internal Server Error",
      "success": false,
      "err": "Error explanation",
      "data": {}
    }
    ```

### Publish Message

- **URL:** `/bookingservice/api/publish`
- **Method:** `POST`
- **Body Parameters:**
  - `subject` (string, required): Subject of the notification.
  - `content` (string, required): Content of the notification.
  - `recepientEmail` (string, required): Email of the recipient.
  - `notificationTime` (string, required): Time of the notification.
  - [`service`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2Fxcruzhd2%2FDesktop%2FProject%2FBackend%2FBookingService%2Fsrc%2Fservices%2Findex.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A1%2C%22character%22%3A37%7D%7D%5D%2C%223002442b-a21b-4afd-84f3-e4a285ac1bb5%22%5D "Go to definition") (string, optional): Service name.
- **Response:**
  - **Success:** 200 OK
    ```json
    {
      "message": "Successfully published the event",
      "success": true,
      "err": {},
      "data": {}
    }
    ```
  - **Error:** 400 Bad Request
    ```json
    {
      "message": "Invalid request data",
      "success": false,
      "err": "Error explanation",
      "data": {}
    }
    ```
  - **Error:** 500 Internal Server Error
    ```json
    {
      "message": "Internal Server Error",
      "success": false,
      "err": "Error explanation",
      "data": {}
    }
    ```

## Database Design
The database schema consists of three tables: `Users`, `Flights`, and `Bookings`.


#### Bookings
- **id**: INTEGER, Primary Key, Auto Increment
- **flightId**: INTEGER, Not Null, Foreign Key (References `Flights.id`)
- **userId**: INTEGER, Not Null, Foreign Key (References `Users.id`)
- **status**: ENUM('Inprocess', 'Confirmed', 'Cancelled'), Not Null, Default: 'Inprocess'
- **noOfSeats**: INTEGER, Not Null, Default: 1
- **totalCost**: INTEGER, Not Null, Default: 0
- **createdAt**: DATE, Not Null
- **updatedAt**: DATE, Not Null

### Relationships
- A `User` can have multiple `Bookings`.
- A `Flight` can have multiple `Bookings`.
- Each `Booking` is associated with one `User` and one `Flight`.


## Acknowledgements

This project was developed as part of the backend course by Sanket Sir. Special thanks to Sanket Sir for his invaluable guidance and support throughout the course.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. **Fork the repository**: Click the "Fork" button at the top right of this page to create a copy of this repository in your GitHub account.

2. **Clone your fork**: Clone your forked repository to your local machine using the following command:

   ```sh
   git clone https://github.com/your-username/AirTicketBookingService.git
   ```

3. **Create a new branch**: Create a new branch for your feature or bugfix:

   ```sh
   git checkout -b feature-or-bugfix-name

   ```

4. **Make your changes**: Make your changes to the codebase.

5. **Commit your changes**: Commit your changes with a descriptive commit message:

   ```sh
   git commit -m "Description of the feature or bugfix"
   ```

6. **Push to your fork**: Push your changes to your forked repository:

   ```sh
   git push origin feature-or-bugfix-name
   ```

7. **Create a Pull Request**: Go to the original repository and create a pull request from your forked repository. Provide a clear description of your changes and why they should be merged.

I will review your pull request and provide feedback. Once approved, your changes will be merged into the main branch.

Thank you for your contributions!

