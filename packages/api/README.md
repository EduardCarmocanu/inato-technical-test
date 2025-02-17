## Description

This API exposes ongoing clinical trials

## Getting started

To get started follow the steps bellow
- Run `nvm use` to use appropriate node version
    - [how to install nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) if needed
- Run `pnpm install` to install dependencies
- Run `pnpm start:dev` to start a local development server
- At this point you should see the server running in watch mode and you can execute requests against it

## Endpoints

### `GET: /trials/ongoing`
```
Query parameters:

- country: <FR,AT,DE,ES,IT> (optional)
- sponsor: <string> (optional)
```

```
Reponse format:

[
    {
        "name": string,
        "end_date": string ("YYYY-MM-DD"),
        "start_date": string ("YYYY-MM-DD"),
        "sponsor": string
    },
    ...
]
```

Example usage: 

`curl -XGET 'http://www.localhost:3000/trials/ongoing?country=FR&sponsor=Sanofi'`

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# integration tests
$ pnpm run test:integration

# test coverage
$ pnpm run test:cov
```
