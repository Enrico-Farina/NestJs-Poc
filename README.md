<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
  [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
    <p align="center">


## Project setup
```bash
$ npm install
```
Create .env file, Setup with: <br>
JWT_SECRET (You can create a random secret) <br>
SMTP_SERVER (smtp.gmail.com) <br>
SMTP_PORT (587) <br>
GMAIL_AUTH_USER (your gmail account) <br>
GMAIL_AUTH_PASS (your gmail mailer code, its not your password) <br> <br>
In this project, we use a gmail account to send emails. You can search to how implement this. <br>
For alternative smtp servers, you must lighly modify the code in /email directory.



## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

Tests have not yet been implemented

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

Deployment have not yet been used

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
