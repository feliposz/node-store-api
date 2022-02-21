# node-store-api

A REST API for a fictional online store coded while following [André Baltieri](https://github.com/andrebaltieri)'s [tutorial](https://www.youtube.com/playlist?list=PLHlHvK2lnJndvvycjBqQAbgEDqXxKLoqn) from [balta.io](https://github.com/orgs/balta-io).

After finishing it, I decided to convert it to [Typescript](https://www.typescriptlang.org/) for additional practice.

## Technologies

- ~~Javascript~~ Typescript
- Node.js
    - Nodemon
    - Express.js
    - Mongoose (for MongoDB)
    - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [MongoDB](https://www.mongodb.com/pt-br)
- Authentication/Authorization using [JWT](https://jwt.io/)
- Sending e-mail through [SendGrid](https://sendgrid.com/) service
- Storage for images using Azure Storage service
- Applied patterns (Model, Controller, Repository, Service)

## References

[Criando APIs com NodeJs](https://www.youtube.com/playlist?list=PLHlHvK2lnJndvvycjBqQAbgEDqXxKLoqn) (Brazilian portuguese)

[How to Convert Node.js Code from JavaScript to TypeScript](https://javascript.plainenglish.io/how-to-convert-node-js-code-from-javascript-to-typescript-8e7d031a8f49)

## Requirements

- Node.js must be installed
- You need a MongoDB server running locally or on a provider like [MongoDB Atlas](https://www.mongodb.com/pt-br/atlas). Edit the connection string on `config.ts` to point to your server.

Install dependencies with:

```
npm install
```

## Configuration

Copy file `config.template.ts` to `config.ts` and edit values.

To enable cloud storage on Azure and e-mailing through SendGrid you need to enter API keys on the config file.

If deploying on a cloud service provider, it is recommended to grab values from the environment. Change `config.ts` to something like this:

```typescript
module.exports = {
    connectionString: process.env.MONGODB_CONNSTR,
    sendgridKey: process.env.SENDGRID_API_KEY,
    sendgridSender: process.env.SENDGRID_SENDER,
    azureContainerConnectString: process.env.AZURE_CONNSTR
};
```

And create the environment variables accordingly.

## Running

To run locally, type in a terminal at the project's root folder:

```
npm start
```

To execute the server while watching code changes, use:

```
npx nodemon -r ts-node/register/transpile-only src/server.js
```

To debug inside Visual Studio Code, press `F5` or go to menu `Run > Start debugging`.

## Folder structure

```
/
├───.vscode               Configuration for Visual Studio Code
├───node_modules          Installed module dependencies
├───out                   Output dir for transpiled javascript
└───src                   Source code for server
    |
    │   server.ts         Server startup code
    │   app.ts            Main application code
    │   config.ts         Configuration
    │
    ├───models            Model definitions for mongoose/MongoDB
    ├───repositories      Data repository
    ├───controllers       Controller implementation
    ├───routes            Routing configuration
    ├───services          Services for storage, mailing and auth
    └───validators        Data validation utilities
```
