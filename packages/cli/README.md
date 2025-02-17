# Description

This CLI serves as a client to query the API in order to retrieve a list of clinical trials.

## Getting started

To get started follow the steps bellow
- Run `nvm use` to use appropriate node version
    - [how to install nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) if needed
- Run `pnpm install` to install dependencies
- From project root run `pnpm api start:dev` to start the api
    - If you haven't setup the api before doing this you should follow the `Getting started` section of the api package README.md file and come back here
- At this point you should see the server running in watch mode and you can execute requests against it
- From cli package root, run `pnpm start --country=FR`
- At this point you should see a list of ongoing trials returned in your terminal

## Usage:

To get a list of clinical trials for one of the available countries you can use `pnpm start --country=FR`

### Options:

#### `-c, --country <FR,ES,IT,DE,AT> `
```
Specifies the country filtering option (choices: "FR", "ES", "IT", "DE", "AT")
```
Example usage: `pnpm start --country=FR`

---

#### `-h, --help`
```
display help for command
```
Example usage: `pnpm start --help`
