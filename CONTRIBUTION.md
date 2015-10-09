# Contributions guideline

## Javascript

* Use `jscs` for code style, rules [here](.jscsrc)
* Use `jshint` for code linting, rules [here](.jshintrc)
* Use yeoman [generator-angular](https://github.com/yeoman/generator-angular)
  for filename convention

## Gitflow

* Use the standard [Github flow](https://guides.github.com/introduction/flow/) process

### Git Commit Messages

Use [fit-commit](https://github.com/m1foley/fit-commit) to enforce guidelines
locally

#### Commit Subject

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Do not end your subject line with a period
* Begin all subject lines with a capital letter
* Consider starting the commit message with an applicable emoji:
  * :art: `:art:` when improving the format/structure of the code
  * :racehorse: `:racehorse:` when improving performance
  * :memo: `:memo:` when writing docs
  * :bug: `:bug:` when fixing a bug
  * :fire: `:fire:` when removing code or files
  * :green_heart: `:green_heart:` when fixing the CI build
  * :white_check_mark: `:white_check_mark:` when adding tests
  * :lock: `:lock:` when dealing with security
  * :arrow_up: `:arrow_up:` when upgrading dependencies
  * :arrow_down: `:arrow_down:` when downgrading dependencies
  * :shirt: `:shirt:` when removing linter warnings

#### Commit Description

* Limit commit description to 72 characters or less
* Reference issues and pull requests URL liberally
* Should contain the following sections:
  * **Problem** - What is the problem you are trying to solve?
  * **Solution** - How it was it implemented?
  * **Result** - What is the added value on the project

### Pull requests

* Should contain clean history with [only one
  commit](https://www.atlassian.com/git/tutorials/merging-vs-rebasing/workflow-walkthrough)
  (use `rebase -i`)
* Should pass the continuous server tests
* Should contain same description than the commit itself
* Use :+1: and :-1: for final review feedback

### Branching model

#### Branches name

* Default branch is `develop`
* Should respect the following format: `[feature|bug|test]/[ticket id]-[short description]`

**Example**
* `feature/42-AddHeatmapChart`
* `bug/43-fixNavbarLinks`
* `test/e2eAddRouteFeature`

#### Branching model
![Branching Model](http://nvie.com/img/git-model@2x.png)
