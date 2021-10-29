
# DrJulian Coding Challenge
Code challenge for DrJulian.

## What do you need
* Node.js
* PostgresSQL

## Setup
### Database:
-  update your database credential in `src/config/environments/development.ts`
### Development:
```javascript
npm install
npm run start // start development
npm run test // run test
```

## Your task:
* Write API with Express framework (with typescript)
* Use API to authenticate users and store them in PostgresSQL
* Include any necessary validations on calling the API
* There're 2 types of users:
	* admin
	* user

* Your API should allow all users (both admin/user type):
   * To register
   * To login
   * To logout

* Also, create API for admin ONLY (admin type) to allow admins:
	* To edit user
	* To delete user

### Bonus:
* Add route tests

### You could:
* Use any npm library you like