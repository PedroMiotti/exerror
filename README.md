![Exerror Logo](https://github.com/PedroMiotti/exerror/blob/main/.github/img/logo.png)

A lightweight library to gracefully handle errors in expressJs

![GitHub repo size](https://img.shields.io/github/repo-size/PedroMiotti/exerror)
![npm](https://img.shields.io/npm/dw/@pedromiotti/exerror)
![GitHub](https://img.shields.io/github/license/PedroMiotti/exerror)

```js
import express from 'express';
const app = express();

import { errorHandler }  from '@pedromiotti/exerror'; // Import it

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.use(errorHandler); //Simply pass the errorHandler middleware

app.listen(3000)
```

## Installation

```bash
$ npm install @pedromiotti/exerror
```

## Use

```ts
// Controller

import express from 'express';
const UserService = require('../services/UserService');

class UserController{
    public static async RegisterUser( req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>{
        try {
            const {username, password} = req.body;
            let user: Promise<String> = await UserService.registerUser(username, password);

            res.status(200).send(user)
        }
        catch (e) {
            next(e); // Catch the error thrown by the `UserService.registerUser` function and pass it to the middleware
        }
    }
}

export { UserController };
```

```ts
// Service 

import { ApplicationError, CommonHTTPExceptions }  from '@pedromiotti/exerror';

import { UserModel } from "../models/UserModel";

const registerUser = async(username: string, password: string): Promise<String> => {
    let user;
    /*
    * Throw a new ApplicationError either with our pre-defined errors or 
    *  you can create your own as shown bellow.
    */
    if(!username || !password) 
        throw new ApplicationError(CommonHTTPExceptions.BAD_REQUEST);   

    try{
        user = await UserModel.registerUser();
    }
    catch (e) {
        /*
        * Trying to register a User on the database. If the database throws an error,
        * it will also be caught by our middleware.
        */
        throw new ApplicationError(e); 
    }

    return user;
}

export { registerUser };
```


An example of how the first error will look for the client.
```json
{
    "error": {
        "name": "ApplicationError",
        "type": "CLIENT",
        "code": "BAD_REQUEST",
        "message": "Bad request"
    },
    "success": false
}
```
And the second error, if the database does not exist.

```json
{
  "error": {
    "name": "ApplicationError",
    "code": "ER_BAD_DB_ERROR",
    "message": "ER_BAD_DB_ERROR: Unknown database 'express'"
  },
  "success": false
}
```

## Creating your own custom errors

1. Create a folder called exceptions (optional, and you can call whatever you want).
   
2. Inside create a file. Let's call it `customExceptions.ts`.

3. Start by importing our `ERROR_TYPES`:
   
    ```ts  
    import { ERROR_TYPES } from '@pedromiotti/exerror'; 
   ```
4. Then you can create your error object :

    ```ts  
    const CustomExceptions = {};
    ```
5. Each error has to have this template:
   
   ```ts
    ERROR_NAME: {
        type: ,
        code: "",
        message: "",
        statusCode: ,
    }
    ```
   For example:
   
   ```ts
    MISSING_INFORMATION: {
        type: ERROR_TYPES.CLIENT,
        code: "MISSING_INFORMATION",
        message: "Fill all the information required.",
        statusCode: 400,
    }
    ```
OBS:
*You have to use one of our `ERROR_TYPES` for the `type` field, they are:*

   ```ts
    enum ERROR_TYPES {
        INTERNAL = "INTERNAL",
        CLIENT = "CLIENT",
        NETWORK = "NETWORK",
        SERVER = "SERVER",
        UNKNOWN = "UNKNOWN"
    }
   ```

### Using your custom errors


```ts
import { ApplicationError }  from '@pedromiotti/exerror';
import { UserModel } from "../models/UserModel";
import { CustomExceptions } from "../exceptions/customExceptions"; // Import it

const registerUser = async(username: string, password: string): Promise<String> => {
    let user;
    
    if(!username || !password) throw new ApplicationError(CustomExceptions.MISSING_INFORMATION); // And simply use it

    try{
        user = await UserModel.registerUser();
    }
    catch (e) {
        throw new ApplicationError(e);
    }

    return user;
}

export { registerUser };
```


## Licence

[MIT](LICENSE)
