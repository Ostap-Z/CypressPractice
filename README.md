# CypressPractice
# Contribution rules

You should follow GIT flow policy as much as possible.

* Check out the branch you want to base your work on, which is usually *develop*, but sometimes a release or hotfix branch (see below for more details about branches)
* Create a new branch referring to the jira issue you are working on (i.e. bugfix/CYP-123_Crash_after_tap_on_start_button).
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
  * Mark comments as **resolved** as you go through and fix them, while giving an explaining comment answering any questions asked.
* Push new commits without rebasing anything so reviewers can see your gradual changes.
* When all comments have been resolved and all checks pass, you can merge.
  * Use squash if it's a small, single item change.
  * Use rebase to keep the commit history (i.e. first a refactoring commit, then the actual fix).
  * Use merge **only** if your branch is one of the long-term branches, i.e. release/x.y.z. -> dev.
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
* The *develop* branch is created from *main*.
* A *release* branch is created from *develop* (usually with release number suffix, i.e. release/3.2.0).
* The *feature* branches are created from *develop*.
* When a *feature* is complete it is merged (or rebase/squashed) into/onto the *develop* branch.
* When the *release* branch is done it is merged into *develop* and *main*
  (*release* branches can acutally be merged to *develop* continously).
* If an issue in *main* is detected, a *hotfix* branch is created from *main*.
* Once the *hotfix* is complete it is merged to both *develop* and *main*.

## Lint Rules
The following linting rules are currently in place. On save, if the rules can be auto-fixed, it will do so in the file. 
Also, we can run the command `npm run lint` to scan the entire project for errors and warnings.

It is also suggested to download the ESLint VSCode plugin, as it will provide highlighting during development. 
Extension ID: dbaeumer.vscode-eslint

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