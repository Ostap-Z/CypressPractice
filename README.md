# CypressPractice
End-to-End testing repository that utilizes the Cypress test framework.

# Cypress Documentation
You can find the main Cypress documentation page [here](https://docs.cypress.io/guides/overview/why-cypress).

# Node Setup

### Install nvm
[instruction](https://github.com/nvm-sh/nvm)

### Install node version
```
nvm install
```
### Use node version
```
nvm use
```
### Set nvm default
This allows for the commit hooks, and not having to run nvm use all the time.
```
nvm alias default $(cat .nvmrc)
```

# NVM Shell Integration
You can use avn to deeply integrate into your shell and automatically invoke nvm when changing directories [here](https://github.com/nvm-sh/nvm?tab=readme-ov-file#deeper-shell-integration).

## For shell users
Alias would search 'up' from your current directory in order to detect a `.nvmrc` file. If it finds it, it will switch to that version; if not, it will use the default version.

Put the following at the end of your `$HOME/.bashrc`:

```
cdnvm() {
    command cd "$@" || return $?
    nvm_path="$(nvm_find_up .nvmrc | command tr -d '\n')"

    # If there are no .nvmrc file, use the default nvm version
    if [[ ! $nvm_path = *[^[:space:]]* ]]; then

        declare default_version
        default_version="$(nvm version default)"

        # If there is no default version, set it to `node`
        # This will use the latest version on your machine
        if [ $default_version = 'N/A' ]; then
            nvm alias default node
            default_version=$(nvm version default)
        fi

        # If the current version is not the default version, set it to use the default version
        if [ "$(nvm current)" != "${default_version}" ]; then
            nvm use default
        fi
    elif [[ -s "${nvm_path}/.nvmrc" && -r "${nvm_path}/.nvmrc" ]]; then
        declare nvm_version
        nvm_version=$(<"${nvm_path}"/.nvmrc)

        declare locally_resolved_nvm_version
        # `nvm ls` will check all locally-available versions
        # If there are multiple matching versions, take the latest one
        # Remove the `->` and `*` characters and spaces
        # `locally_resolved_nvm_version` will be `N/A` if no local versions are found
        locally_resolved_nvm_version=$(nvm ls --no-colors "${nvm_version}" | command tail -1 | command tr -d '\->*' | command tr -d '[:space:]')

        # If it is not already installed, install it
        # `nvm install` will implicitly use the newly-installed version
        if [ "${locally_resolved_nvm_version}" = 'N/A' ]; then
            nvm install "${nvm_version}";
        elif [ "$(nvm current)" != "${locally_resolved_nvm_version}" ]; then
            nvm use "${nvm_version}";
        fi
    fi
}

alias cd='cdnvm'
cdnvm "$PWD" || exit
```

## For zsh users
This shell function will install (if needed) and nvm use the specified Node version when an `.nvmrc` is found, and nvm use default otherwise.

Put this into your `$HOME/.zshrc` to call `nvm use` automatically whenever you enter a directory that contains an `.nvmrc` file with a string telling nvm which node to `use`:

```
# place this after nvm initialization!
autoload -U add-zsh-hook

load-nvmrc() {
  local nvmrc_path
  nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version
    nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$(nvm version)" ]; then
      nvm use
    fi
  elif [ -n "$(PWD=$OLDPWD nvm_find_nvmrc)" ] && [ "$(nvm version)" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}

add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

## For fish users
This requires that you have [bass](https://github.com/edc/basshttps://docs.cypress.io/guides/overview/why-cypress) installed.

```
# ~/.config/fish/functions/nvm.fish
function nvm
  bass source ~/.nvm/nvm.sh --no-use ';' nvm $argv
end

# ~/.config/fish/functions/nvm_find_nvmrc.fish
function nvm_find_nvmrc
  bass source ~/.nvm/nvm.sh --no-use ';' nvm_find_nvmrc
end

# ~/.config/fish/functions/load_nvm.fish
function load_nvm --on-variable="PWD"
  set -l default_node_version (nvm version default)
  set -l node_version (nvm version)
  set -l nvmrc_path (nvm_find_nvmrc)
  if test -n "$nvmrc_path"
    set -l nvmrc_node_version (nvm version (cat $nvmrc_path))
    if test "$nvmrc_node_version" = "N/A"
      nvm install (cat $nvmrc_path)
    else if test "$nvmrc_node_version" != "$node_version"
      nvm use $nvmrc_node_version
    end
  else if test "$node_version" != "$default_node_version"
    echo "Reverting to default Node version"
    nvm use default
  end
end

# ~/.config/fish/config.fish
# You must call it on initialization or listening to directory switching won't work
load_nvm > /dev/stderr
```

# Setup Test Framework
Prior to running any tests in the Cypress Test Runner or in the headless execution mode you will need to set a few things up:

1. Run an install of packages within the project `root` directory.

```
npm install
```

# Run Tests
Executes in the command line against the chrome browser:
```
npm run cy:run:chrome
```

Executes in the command line against the webkit browser:
```
npm run cy:run:webkit
```

Opens the Cypress Test Runner UI:
```
npm run cy:open
```

## Examples
Run a whole test suite:
```
npm run cy:run:chrome -- -s "tests/examples/example.feature"
```

# Making Tests
When making new tests we need to do a few things:

* Make new tests in Behavior Driver Development (BDD) feature files (named `*.feature`) under the `./tests/**/` directory.
* Make new regular tests (named `*.cy.js`) under the `./tests/**/` directory.
* Step files (named `*.steps.js`) should be created side-by-side with the `*.feature` files.
- Once the test, POM, and / or helper files are created be sure to run the tests in the Cypress Test Runner (UI) and in headless mode a few times to catch any flakiness that may be present.
- Push code to a PR to be able to merge it into repository.

# Contribution rules
You should follow GIT flow policy as much as possible.

* Check out the branch you want to base your work on, which is usually `develop`, but sometimes a release or hotfix branch (see below for more details about branches)
* Create a new branch referring to the jira issue you are working on (i.e. `bugfix/CYP-123_Crash_after_tap_on_start_button`).
* Make changes and commit locally.
* Push branch to [GitHub](https://github.com/Ostap-Z/CypressPractice).
  * Our preferred branch name template is `feature/CYP-xxx_short_description`
* Create a [GitHub pull request](https://github.com/Ostap-Z/CypressPractice/pulls) targeting the right branch.  
  (Mark the PR as draft if you just want to see how it builds, or get some early comments/reviews from colleagues).
* Add any reviewers that you feel should take a closer look, or leave empty.
* Move the Jira issue into 'Code Review'.
* Wait for other developers to review.
* Update your code with any comments given.  
  * Ask questions if you think something is unclear or unreasonable.  
  * Be sure to address any comments even if you got "approved", it means "looks good, but this need to be fixed before PR".
  * Mark comments as `resolved` as you go through and fix them, while giving an explaining comment answering any questions asked.
* Push new commits without rebasing anything so reviewers can see your gradual changes.
* When all comments have been resolved and all checks pass, you can merge.
  * Use squash if it's a small, single item change.
  * Use rebase to keep the commit history (i.e. first a refactoring commit, then the actual fix).
  * Use merge `only` if your branch is one of the long-term branches, i.e. release/x.y.z. -> dev.
    When doing these types of merge, you often want to keep the source branch around afterwards,
    so be sure to restore it in GitHub if that is the case.  
    (The only exception is when doing the final release->master merge for actually doing a release,  
    In those cases we don't want to keep that release branch anymore).
 * Set the 'qa_skip' label and move the jira issue to the 'Done' status

## Git history/commit guidelines
* Try to address one thing per commit
* Avoid mixing refactoring commits with bugfixes or new features
* If you don't have a long running branch or something with merges from your target, 
  rebase your changes on top of the target branch.
* Follow the following commit messages convention:
  * Start a `Subject` with the upper letter.
  * Use an imperative mood for the `Subject`.
  * Include a jira issue into a `Subject` (i.e. `[CYP-123] My commit message`).
  * Limit a `Subject` to the 50 symbols.
  * Do not end a `Subject` with a period.
  * Use a line break between `Subject` and `Body`.
  * Limit a `Body` to the 72 symbols, use the '\n' for a line break.
  * Use a `Body` to describe 'What' and 'Why' has been changed instead of 'How'.
  * Include a jira issue into a `Body`.

## Gitflow
The main points of the GitFlow branching model are:
* The `develop` branch is created from `main`.
* A `release `branch is created from `develop` (usually with release number suffix, i.e. release/3.2.0).
* The `feature` branches are created from `develop`.
* When a `feature` is complete it is merged (or rebase/squashed) into/onto the `develop` branch.
* When the `release` branch is done it is merged into `develop` and `main`
  (`release` branches can acutally be merged to `develop` continously).
* If an issue in `main` is detected, a `hotfix` branch is created from `main`.
* Once the `hotfix` is complete it is merged to both `develop` and `main`.

## Lint Rules
The following linting rules are currently in place. On save, if the rules can be auto-fixed, it will do so in the file. 
Also, we can run the command `npm run lint` to scan the entire project for errors and warnings.

It is also suggested to download the ESLint VSCode plugin, as it will provide highlighting during development. 
Extension ID: `dbaeumer.vscode-eslint`

* Indentions - Enforces use of 2 spaces vs tabs.
* Line breaks - Enforces Unix style line breaks.
* Quotes - Enforces use of single quotes.
* Semi - Enforces use of semicolons at the end of lines.
* Space Before Function Parentheses - Enforces a space after the function name before the parentheses: `function foo () { }`.
* No Unused Variables - Enforces that all variables must be used if included in a file.
* Max Classes per File - Enforces a maximum of 3 classes per file.
* Max Length - Enforces a maximum length of code - 79, comments - 72 and ignores this rule for the URL, template and regex literals.
* No Multiple Empty Lines - Enforces use of maximum 2 empty lines inside a code, 0 on the beginning and ending of a file.
* End Of Line Last - Enforces use of an empty line inside a file.