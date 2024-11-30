
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

