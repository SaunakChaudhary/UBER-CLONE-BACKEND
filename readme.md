
# Backend API Documentation

## **1. User Registration API :** 


## `/users/register` Endpoint

### **HTTP Method:** `POST`

**Description:** This API allows users to register by providing their first name, last name, email, and password. The registration process includes validation and returns a token upon successful registration.

Registers a new user by saving their details in the database and returns a JWT token.

**Validation:**
- `fullname` (object):
  - `firstname` (string, required): User's first name (minimum 3 characters).
  - `lastname` (string, optional): User's last name (minimum 3 characters).
- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required): User's password (minimum 6 characters).

- **Request Body :**

```
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "password123"
}
```

- **Response (Success - 201) :**

```
{
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "6479bc983123456789",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "johndoe@example.com",
    "password": "$2b$10$CyPGYbav4wsK4dMp9Pt8qu/91I/YzvGK/Ekn0nEArUM.P3VCwzSAi",
    "__v": 0
  }
}
```

- **Response (Error - 400) :**

```
{
  "message": "User already exists"
}

```
##
## **2. User Login API :** 


## `/users/login` Endpoint

### **HTTP Method:** `POST`

**Description:** The `/users/login` endpoint is used by registered users to authenticate and log in to the system. Upon successful authentication, the endpoint generates a JWT token for the user and returns it along with the user's details. This token can be used for subsequent requests to access protected resources.

**Validation:**
- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required): User's password (minimum 6 characters).

- **Request Body :**

```
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

- **Response (Success - 201) :**

```
{
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "6479bc983123456789",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "johndoe@example.com",
    "__v": 0
  }
}
```

- **Response (Error - 400) :**
If the request fails validation or if the email or password is incorrect, the server will return an error response. Example error response:
```
{
  "message": "Invalid Email or Password"
}

```

## **3. User Profile API**

## `/users/profile` Endpoint

### **HTTP Method:** `GET`

**Description:** The `/users/profile` endpoint allows authenticated users to fetch their profile information. The request requires a valid JWT token for authorization. If the user is not authorized, an error is returned.

**Authorization:**

- Requires a valid JWT token to be provided via cookies or the Authorization header as :

```
Authorization: Bearer <JWT_TOKEN>
```

**Flow:**

- Middleware authUser verifies the token.
If the token is valid and not blacklisted, retrieves the user's profile.
Returns the user's details or an error message if unauthorized or another error occurs.

## **Response :** 
- **Status(200)**
```
{
  "_id": "6479bc983123456789",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "johndoe@example.com",
  "__v": 0
}
``` 

- **Status(401)**
```
{
  "message": "Unauthorized"
}
```

- **Status(500)**
```
{
  "message": "Internal server error occurred."
}
```


## **4.  Logout API**

## `/users/logout` Endpoint

### **HTTP Method:** `GET`

**Description:** This api logs out an authenticated user by invalidating their JWT token and blacklisting it. The token is stored in a database (blacklist) to ensure it cannot be reused..

**Authorization:**

- Requires a valid JWT token.
- The token should be provided in:
  - Cookies: token=<JWT_TOKEN>
  - OR the Authorization header: Authorization: Bearer <JWT_TOKEN>

## **How It Works:**
  1. The token is extracted from cookies or the Authorization header.
  2. The token is cleared from the user's cookies.
3. The token is added to a blacklist database (BlacklistToken) to ensure it cannot be reused.
4. A success message is returned.

## **Response :** 
- **Status(200)**
```
{
  "message": "Logged out"
}
``` 

- **Status(401)**
```
{
  "message": "Unauthorized"
}
```

## **5. Captain Registration API :** 


## `/captains/register` Endpoint

### **HTTP Method:** `POST`

**Description:** This API allows captains to register by providing their first name, last name, email,vehicle detials and password. The registration process includes validation and returns a token upon successful registration.

Registers a new user by saving their details in the database and returns a JWT token.

**Validation:**
- `fullname` (object):
  - `firstname` (string, required): Captain's first name (minimum 3 characters).
  - `lastname` (string, optional): Captain's last name (minimum 3 characters).
- `email` (string, required): Captain's email address (must be a valid email).
- `password` (string, required): Captain's password (minimum 6 characters).
- `vehicles` (object): 
  - `color` (string,required): Captain's Vehicle color (minimum 3 characters)
  - `plate` (string,required): Captain's Vehicle number plate (minimum 3 characters) 
  - `capacity` (string,required): Captain's Vehicle capacity (minimum 1)
  - `vehicleType` (string,required): Captain's Vehicle type (It Should be car , motorcycle or auto)


- **Request Body :**

```
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "password123",
  "vehicles":{
        "color":"Yellow",
        "plate" : "GJ 09 AH 6696",
        "capacity" : "3",
        "vehicleType":"motorcycle"
    }
}
```

- **Response (Success - 201) :**

```
{
    "token": <JWT_TOKEN>,
    "user": {
        "fullName": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "email": "johndoe@example.com",
        "password": "$2b$10$CyPGYbav4wsK4dMp9Pt8qu/91I/YzvGK/Ekn0nEArUM.P3VCwzSAi",
        "status": "inactive",
        "vehicles": {
            "color": "Yellow",
            "plate": "GJ 09 AH 6696",
            "capacity": 3,
            "vehicleType": "motorcycle"
        },
        "_id": "674b0bfaa0a0f12189d9712d",
        "__v": 0
    }
}
```

- **Response (Error - 400) :**

```
{
  "message": "Captain already exists"
}
```

##
## **6. Captain Login API :** 


## `/captains/login` Endpoint

### **HTTP Method:** `POST`

**Description:** The `/captains/login` endpoint is used by registered captains to authenticate and log in to the system. Upon successful authentication, the endpoint generates a JWT token for the captain and returns it along with the captain's details. This token can be used for subsequent requests to access protected resources.

**Validation:**
- `email` (string, required): Captain's email address (must be a valid email).
- `password` (string, required): Captain's password (minimum 6 characters).

- **Request Body :**

```
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

- **Response (Success - 201) :**


```
{
    "token": <JWT_TOKEN>,
    "user": {
        "fullName": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "email": "johndoe@example.com",
        "password": "$2b$10$CyPGYbav4wsK4dMp9Pt8qu/91I/YzvGK/Ekn0nEArUM.P3VCwzSAi",
        "status": "inactive",
        "vehicles": {
            "color": "Yellow",
            "plate": "GJ 09 AH 6696",
            "capacity": 3,
            "vehicleType": "motorcycle"
        },
        "_id": "674b0bfaa0a0f12189d9712d",
        "__v": 0
    }
}
```


- **Response (Error - 400) :**
If the request fails validation or if the email or password is incorrect, the server will return an error response. Example error response:
```
{
  "message": "Invalid Email or Password"
}
```

## **7. Captain Profile API**

## `/captains/profile` Endpoint

### **HTTP Method:** `GET`

**Description:** The `/captains/profile` endpoint allows authenticated captains to fetch their profile information. The request requires a valid JWT token for authorization. If the captain is not authorized, an error is returned.

**Authorization:**

- Requires a valid JWT token to be provided via cookies or the Authorization header as :

```
Authorization: Bearer <JWT_TOKEN>
```

**Flow:**

- Middleware authCaptain verifies the token.
If the token is valid and not blacklisted, retrieves the captain's profile.
Returns the captain's details or an error message if unauthorized or another error occurs.

## **Response :** 
- **Status(200)**

```
{
    "token": <JWT_TOKEN>,
    "user": {
        "fullName": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "email": "johndoe@example.com",
        "password": "$2b$10$CyPGYbav4wsK4dMp9Pt8qu/91I/YzvGK/Ekn0nEArUM.P3VCwzSAi",
        "status": "inactive",
        "vehicles": {
            "color": "Yellow",
            "plate": "GJ 09 AH 6696",
            "capacity": 3,
            "vehicleType": "motorcycle"
        },
        "_id": "674b0bfaa0a0f12189d9712d",
        "__v": 0
    }
}
```
 

- **Status(401)**
```
{
  "message": "Unauthorized"
}
```

- **Status(500)**
```
{
  "message": "Internal server error occurred."
}
```

## **8.  Logout for Captain API**

## `/captains/logout` Endpoint

### **HTTP Method:** `GET`

**Description:** This api logs out an authenticated captains by invalidating their JWT token and blacklisting it. The token is stored in a database (blacklist) to ensure it cannot be reused..

**Authorization:**

- Requires a valid JWT token.
- The token should be provided in:
  - Cookies: token=<JWT_TOKEN>
  - OR the Authorization header: Authorization: Bearer <JWT_TOKEN>

## **How It Works:**
  1. The token is extracted from cookies or the Authorization header.
  2. The token is cleared from the user's cookies.
3. The token is added to a blacklist database (BlacklistToken) to ensure it cannot be reused.
4. A success message is returned.

## **Response :** 
- **Status(200)**
```
{
  "message": "Logged out"
}
``` 

- **Status(401)**
```
{
  "message": "Unauthorized"
}
```

