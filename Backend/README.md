# Backend API Documentation

## Endpoints

### POST /user/register

#### Description
This endpoint is used to register a new user.

#### Request Body
The request body should be a JSON object containing the following fields:
- `fullName`: An object containing the user's first and last name.
  - `firstName`: The user's first name (minimum 3 characters).
  - `lastName`: The user's last name (optional, minimum 3 characters if provided).
- `email`: The user's email address (must be a valid email).
- `password`: The user's password (minimum 6 characters).

#### Example
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses
- `200 OK`: User registered successfully.
  - Example response:
    ```json
    {
      "user": {
        "_id": "60d0fe4f5311236168a109ca",
        "fullName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "email": "john.doe@example.com",
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

#### Notes
- Ensure that all required fields are provided in the request body.
- The password will be hashed before storing in the database.

### POST /user/login

#### Description
This endpoint is used to log in an existing user.

#### Request Body
The request body should be a JSON object containing the following fields:
- `email`: The user's email address (must be a valid email).
- `password`: The user's password (minimum 6 characters).

#### Example
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses
- `200 OK`: User logged in successfully.
  - Example response:
    ```json
    {
      "user": {
        "_id": "60d0fe4f5311236168a109ca",
        "fullName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "email": "john.doe@example.com",
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
- `401 Unauthorized`: Invalid email or password.
  - Example response:
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

#### Notes
- Ensure that all required fields are provided in the request body.

### GET /user/profile

#### Description
This endpoint is used to get the profile of the logged-in user.

#### Request Headers
- `Authorization`: Bearer token of the logged-in user.

#### Responses
- `200 OK`: User profile retrieved successfully.
  - Example response:
    ```json
    {
      "_id": "60d0fe4f5311236168a109ca",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com",
    }
    ```
- `401 Unauthorized`: User is not authorized.
  - Example response:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

### GET /user/logout

#### Description
This endpoint is used to log out the logged-in user.

#### Request Headers
- `Authorization`: Bearer token of the logged-in user.

#### Responses
- `200 OK`: User logged out successfully.
  - Example response:
    ```json
    {
      "message": "Logged out successfully"
    }
    ```
- `401 Unauthorized`: User is not authorized.
  - Example response:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

#### Notes
- The token will be added to a blacklist to prevent further use.

### POST /captain/register

#### Description
This endpoint is used to register a new captain.

#### Request Body
The request body should be a JSON object containing the following fields:
- `fullName`: An object containing the captain's first and last name.
  - `firstName`: The captain's first name (minimum 3 characters).
  - `lastName`: The captain's last name (optional, minimum 3 characters if provided).
- `email`: The captain's email address (must be a valid email).
- `password`: The captain's password (minimum 6 characters).
- `vehicle`: An object containing the vehicle details.
  - `color`: The vehicle's color (minimum 3 characters).
  - `plate`: The vehicle's plate number (minimum 3 characters).
  - `capacity`: The vehicle's capacity (minimum 1).
  - `vehicleType`: The type of vehicle (must be one of 'car', 'motorcycle', 'auto').

#### Example
```json
{
  "fullName": {
    "firstName": "Jane",
    "lastName": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Responses
- `200 OK`: Captain registered successfully.
  - Example response:
    ```json
    {
      "captain": {
        "_id": "60d0fe4f5311236168a109cb",
        "fullName": {
          "firstName": "Jane",
          "lastName": "Doe"
        },
        "email": "jane.doe@example.com",
        "password": "$2b$10$QrMY125fE521oyElBfIE8u7wsnpWBciuorQ5bHskbM6h14vba7qBy",
        "vehicle": {
          "color": "Red",
          "plate": "XYZ123",
          "capacity": 4,
          "vehicleType": "car"
        }
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

#### Notes
- Ensure that all required fields are provided in the request body.
- The password will be hashed before storing in the database.

### POST /captains/login

#### Description
This endpoint is used to log in an existing captain.

#### Request Body
The request body should be a JSON object containing the following fields:
- `email`: The captain's email address (must be a valid email).
- `password`: The captain's password (minimum 6 characters).

#### Example
```json
{
  "email": "jane.doe@example.com",
  "password": "password123"
}
```

#### Responses
- `200 OK`: Captain logged in successfully.
  - Example response:
    ```json
    {
      "captain": {
        "_id": "60d0fe4f5311236168a109cb",
        "fullName": {
          "firstName": "Jane",
          "lastName": "Doe"
        },
        "email": "jane.doe@example.com",
        "vehicle": {
          "color": "Red",
          "plate": "XYZ123",
          "capacity": 4,
          "vehicleType": "car"
        }
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

#### Notes
- Ensure that all required fields are provided in the request body.

### GET /captains/profile

#### Description
This endpoint is used to get the profile of the logged-in captain.

#### Request Headers
- `Authorization`: Bearer token of the logged-in captain.

#### Responses
- `200 OK`: Captain profile retrieved successfully.
  - Example response:
    ```json
    {
      "captain": {
        "_id": "60d0fe4f5311236168a109cb",
        "fullName": {
          "firstName": "Jane",
          "lastName": "Doe"
        },
        "email": "jane.doe@example.com",
        "vehicle": {
          "color": "Red",
          "plate": "XYZ123",
          "capacity": 4,
          "vehicleType": "car"
        }
      }
    }
    ```
### GET /captains/logout

#### Description
This endpoint is used to log out the logged-in captain.

#### Request Headers
- `Authorization`: Bearer token of the logged-in captain.

#### Responses
- `200 OK`: Captain logged out successfully.
  - Example response:
    ```json
    {
      "message": "Logged out successfully"
    }
    ```
#### Notes
- The token will be added to a blacklist to prevent further use.

### Maps API Endpoints

#### GET /maps/get-coordinates
- **Description**: Get coordinates for a given address
- **Query Parameters**: 
  - `address` (string, min length: 3)
- **Auth Required**: Yes
- **Response**: 
```json
{
  "lng": 123.456,
  "lat": 78.901
}
```

#### GET /maps/get-distance-time
- **Description**: Get distance and time between two locations
- **Query Parameters**:
  - `origin` (string, min length: 3)
  - `destination` (string, min length: 3)
- **Auth Required**: Yes
- **Response**:
```json
{
  "distance": 10.5,
  "duration": "0 days, 2 hours, 30 minutes"
}
```

#### GET /maps/get-suggestions
- **Description**: Get location suggestions based on input
- **Query Parameters**:
  - `input` (string, min length: 3)
- **Auth Required**: Yes
- **Response**:
```json
[
  "Location suggestion 1",
  "Location suggestion 2"
]
```

### Ride API Endpoints

#### POST /ride/create
- **Description**: Create a new ride
- **Request Body**:
```json
{
  "pickup": "Pickup location",
  "destination": "Destination location",
  "vehicleType": "auto|car|motorcycle"
}
```
- **Auth Required**: Yes
- **Response**:
```json
{
  "_id": "ride_id",
  "user": "user_id",
  "pickup": "Pickup location",
  "destination": "Destination location",
  "fare": 150.00,
  "status": "pending",
  "otp": "123456"
}
```

### Frontend Components

#### Home Component
- **Path**: `/Frontend/src/components/Home.jsx`
- **Description**: Main component handling the ride booking flow
- **State**:
  - `pickup`: Pickup location
  - `destination`: Destination location
  - `panelOpen`: Controls search panel visibility
  - `vehiclePanel`: Controls vehicle selection panel
  - `confirmRidePanel`: Controls ride confirmation panel
  - `vehicleFound`: Controls vehicle found status
  - `waitingForDriver`: Controls waiting for driver panel

#### LocationSearchPanel Component
- **Path**: `/Frontend/src/pages/LocationSearchPanel.jsx`
- **Description**: Shows location suggestions
- **Props**:
  - `setPanelOpen`: Function to control panel visibility
  - `setVehiclePanel`: Function to control vehicle panel
  - `suggestions`: Array of location suggestions
  - `onSelect`: Function to handle location selection

### API Services

#### Maps Service
- **Path**: `/Backend/services/maps.service.js`
- **Functions**:
  - `getAddressCoordinate(address)`: Convert address to coordinates
  - `getDistanceTime(origin, destination)`: Calculate distance and time
  - `getAutoComleteSuggestions(input)`: Get location suggestions

#### Ride Service
- **Path**: `/Backend/services/ride.service.js`
- **Functions**:
  - `getFare(pickup, destination)`: Calculate fare for different vehicle types
  - `getOTP(num)`: Generate OTP for ride verification
  - `createRide({user, pickup, destination, vehicleType})`: Create new ride

### Models

#### Ride Model
- **Path**: `/Backend/models/ride.model.js`
- **Schema**:
  - `user`: ObjectId (required)
  - `captain`: ObjectId
  - `pickup`: String (required)
  - `destination`: String (required)
  - `fare`: Number (required)
  - `status`: String (enum: ['pending', 'ongoing', 'accepted', 'completed', 'cancelled'])
  - `duration`: Number (seconds)
  - `distance`: Number (meters)
  - `otp`: String (required, hidden)
