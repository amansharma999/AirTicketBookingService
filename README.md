# Booking Service

## Project Overview
The Booking Service is a microservice designed to handle booking operations for a flight reservation system. It provides endpoints for creating bookings, publishing messages to a queue, and retrieving booking information. The service is built using Node.js, Express, and Sequelize for database interactions.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Table of Contents](#table-of-contents)
3. [Setup Instructions](#setup-instructions)
4. [Tools and Technologies](#tools-and-technologies)
5. [Endpoints](#endpoints)
   - [POST /bookings](#post-bookings)
   - [POST /publish](#post-publish) 
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

### POST /bookings
- **Description**: Creates a new booking.
- **Request Body**:
  - **Required**:
    - `flightId` (string): ID of the flight.
    - `noOfSeats` (number): Number of seats to book.
    - `userId` (string): ID of the user making the booking.

- **Response**:
  - **Success** (201 Created):
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
  - **Error** (400 Bad Request):
    ```json
    {
      "message": "Invalid request data",
      "success": false,
      "err": "Error explanation",
      "data": {}
    }
    ```
  - **Error** (500 Internal Server Error):
    ```json
    {
      "message": "Internal Server Error",
      "success": false,
      "err": "Error explanation",
      "data": {}
    }
    ```

### POST /publish
- **Description**: Publishes a message to the queue.
- **Request Body**:
  - **Required**:
    - `subject` (string): Subject of the notification.
    - `content` (string): Content of the notification.
    - `recepientEmail` (string): Email of the recipient.
    - `notificationTime` (string): Time of the notification.
  - **Optional**:
    - `service` (string): Service name.
- **Response**:
  - **Success** (200 OK):
    ```json
    {
      "message": "Successfully published the event",
      "success": true,
      "err": {},
      "data": {}
    }
    ```
  - **Error** (400 Bad Request):
    ```json
    {
      "message": "Invalid request data",
      "success": false,
      "err": "Error explanation",
      "data": {}
    }
    ```
  - **Error** (500 Internal Server Error):
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

