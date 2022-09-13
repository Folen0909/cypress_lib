# cypress_lib
Cypress library with basic setup to fast startup testing on new project.
Contains generalized functions which can be used to write simpler and faster tests.

## Setup
Run `npm install` after cloning to install dependencies.

Open ***cypress.config.ts*** and replace `baseUrl` and `env` variables.

## Structure
- fixtures
  - Folder that contains JSON files for corresponding tests inside ***integration*** folder
- integrations
  - Folder that contains test files for corresponding pages
  - Each test requires JSON file form ***fixtures***
- support
  - Contains common commands that are added to **cy** commands
  - List of all command can be seen in ***index.ts*** file and their function in ***commands.ts***

Advice:
  - Structure JSON files and test file with same name and same folder structure that can be easly connected with page that the test are run at
  - To add new function to cy commands, first add function signature to ***index.ts*** and then body to ***commands.ts***
