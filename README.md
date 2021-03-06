![Gaston, logo](./docs/images/gaston-logo.png)

# Gaston Monorepo

Welcome to the software repository of Gaston. Gaston aims to abolish physical menus in favour of consumer-centric digital ones. This repository contains the code to make that happen!

## Repository Layout

Currently, the repository is split in folders that denotes the responsibility of the underlying software. To run and install any particular software, please follow the README.md in each subrepository.

At the time of writing, the folders represent the following:

    /api <- Monolithic backend for the platform
    /app <- B2C React-native app
    /scrapers <- experimental scrapers for bootstrapping data for the platform

## Contributing

To contribute, you must first acquint yourself with [this gitbranching model](https://nvie.com/posts/a-successful-git-branching-model). In short, develop contains the latest code changes that have gone through inital code review. The develop branch is what you as a developer will branch off of for new features etc.

For releases, a release branch is used. This release branch is effectively made up by tagged checkouts of develop at various points in time. For a new release, a checkout of develop with a certain tag is used, e.g. "1.0". This release branch is then tested thourougly, lastly merged into master, i.e. the deployment of the release.

### Writing Commits

For your commits, please try to write in imperative form and keep it under 50 characters. If more is needed, e.g. for a briefer explanation, write the first 50 characters and then proceed to add a new line and as many description lines (< 70 characters a line) as you please. For a brief rundown on why this matter, check out [this excellent piece by Chris Beams](https://chris.beams.io/posts/git-commit/).

### Branch Etiquette

As a developer, you do not need to worry to much about the release strategy when developing. What you should worry about is readability and traceability. In order to understand the changes made and features added, it is important to be clear and concise when defining your new branches.

    Bad: git checkout -b login
    Better: git checkout -b api/feature/jwt-authentication

    Bad: git checkout -b bugfix
    Better: git checkout -b app/bugfix/menu-rendering-glitch

You need to follow the convention of prefixing branch names to ensure that CI/CD runs correctly.

### Code Review

Once you have defined a new branch and committed changes to it that you're happy with, it is time to create a pull request. To do so, use the web UI on GitHub.com for your branch. Remember, you want to merge into DEVELOP. See [guide](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

When you have passed code review, you are advised to squash your commits. This way every new feature will have a single commit which is easy to navigate, and revert if need be!

### Code Style

Codestyle, formatting and other conventions are code specific and therefore project specific. Please see each individual subrepo for further information in their `Code Style`section.

## Continuous Integration and Continuous Deployment

This backend repository contains configurations to support continuous integration (CI) and continuous deployment (CD) using Google Cloud Platform (GCP) Cloud Build with deploy to existing GCP Cloud Run services.

Because both Cloud Build and Cloud Run is based on Docker containers, various container definition files are the base for both integration and deployment task. These are complemented with Cloud Build configuration files. These are then combined in Cloud Build Trigger configurations in combination with the GitHub Cloud Build plugin to trigger build jobs based on GitHub repository events.

### Configuration Files

CI/CD configuration files are found in the `build/` directory. There are two types of files:

- Docker container files (Dockerfile). Currently one file to create a production enabled container for deployment and file to execute backend unit tests.
- Cloud Build configuration files in YAML format. These are used to perform different build actions such as run tests, create containers for deploy and to do actual deploy. These files require variables to be set to actually work.

### Cloud Build Examples

Cloud Build jobs should only be started using Triggers associated to GitHub events, but to give an idea of what variables must be set in such triggers, the following example commands form an example:

        gcloud builds submit . --config build/cloudbuild-test-build.yaml \
                --substitutions _GCR_HOSTNAME=eu.gcr.io,_DOCKERFILE_BUILD=build/Dockerfile-build,_DOCKERFILE_TEST=build/Dockerfile-test

Above command will trigger a build from current local source code, run unit tests and, if passed, push a new production enabled container to GCP Container Registry.

        gcloud builds submit . --config build/cloudbuild-test-build-deploy.yaml \
                --substitutions _GCR_HOSTNAME=eu.gcr.io,_DOCKERFILE_BUILD=build/Dockerfile-build,_DOCKERFILE_TEST=build/Dockerfile-test,_CLOUD_RUN_REGION=europe-west1,_CLOUD_RUN_SERVICE=testservice

The difference between above command and the previous one is that this Cloud Build configuration also will trigger a deploy to an existing named Cloud Run service (`testservice`) in the given region (`europe-west1`).

### Cloud Build Automagic

To get a smooth CI/CD integration, GitHub and Cloud Build must play together. This is done by installing the Google Cloud Build app in GitHub. This is already done for the gaston-io GitHub organization.

Then Triggers must be configured in Cloud Build to filter out what GitHub repository events should trigger what kind of build events. As of now, two triggers are used for backend:

- Trigger on all Git push events in `gaston` repository to any branch matching `^(api/feature|bugfix)/.*`. Run tests for all feature/bugfix branches and pull request commits.
- Trigger on all Git push and merge events in `gaston` repository to branch `develop`. Run tests and deploy of all new code on develop branch.
