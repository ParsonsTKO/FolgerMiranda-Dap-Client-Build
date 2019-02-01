# DAP Client Frontend Design

## Local requirements

-   GNU Make

## Override configurations and settings

Create the file `.env` with the environment variables, use the `.env.dist` file for reference.  

## Install requirements:

`make requirements`

## Installation

`make`

## Start working

See Pattern Lab docs: <http://patternlab.io/docs/index.html>

### Pushing the changes to the repo

- This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) for releasing new versions
- This projects adheres to [Conventional Commits](https://conventionalcommits.org) for commit guidelines
- This project uses [Semantic Realease](https://semantic-release.gitbook.io/semantic-release) to automatically release a new version depending on commits messages
- This project uses [Semantic Release Changelog](https://github.com/semantic-release/changelog) to automatically generate CHANGELOG.md file
  
Execute the following command to push your changes

`make push`

The command above will pormnt some questions to help you create a good commit message in compliance to the semantic release. 

This project uses semantic release to deploy to **CloudFront CDN** depending on the commit messages in the `master` branch.

### Running the server

`make start`

### Execute tests

`make test`

### Open your environment in the browser

`make open`

### See all commands available

`make help`

## Deploy preview to S3

`make preview`

## Release to CDN

`make release type=<semver version type (patch|minor|major), patch by default>`
