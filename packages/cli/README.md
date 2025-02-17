# Description

This CLI serves as a client to query the API in order to retrieve a list of clinical trials.

## Usage

Before you start using the cli, you need to have the API up and running. 

If you haven't installed the api yet, follow the `Getting Started` instructions in the `api` package and come back here

If you already installed the api, you can simply to go the root of the project and run `pnpm api start:dev`. This will start the api development server at `localhost:3000`

Now that you have the API up an running you can start using the CLI.

### Example usage:

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
