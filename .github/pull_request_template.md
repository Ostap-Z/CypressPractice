# Fixes #CYP-123 - short description of issue #

... describe changes made and why ...

## Related PRs ##

... if any, otherwise remove this section ...
* <https://github.com/Ostap-Z/CypressPractice/pulls/>...

## Checklist for author ##

* all commit messages following a project convention:
  * [ ] - `Subject` starts with the upper letter
  * [ ] - an imperative mood for the `Subject` is used
  * [ ] - includes a jira issue into a `Subject` (i.e. [CYP-123] My commit message)
  * [ ] - `Subject` is limited to the 50 symbols
  * [ ] - `Subject` is not ended with a period
  * [ ] - a line break between `Subject` and `Body` is used
  * [ ] - `Body` is limited to the 72 symbols
  * [ ] - `Body` is used to describe 'What' and 'Why' has been changed instead of 'How'
  * [ ] - includes a jira issue into a `Body`
* [ ] - all related submodule PRs are merged and links updated (if applicable)
* [ ] - implemented code covers the acceptance criteria of the associated ticket
* [ ] - this pull request has an assignee (if applicable)

## Success shot by author ##
... add the test result attachment ...

## Manual for reviewer ##
* What build should be used to run tests? (assuming the latest **develop** build if it's not provided)
* What command to run tests should be performed?

## Checklist for reviewer ##

* [ ] - check for syntax errors
* [ ] - check that code isn’t more complex than it should be
* [ ] - check that the code is related to the ticket code. If the code has functions for future use, it should not be implemented in this merge request
* [ ] - check that the code is commented and documented (if applicable)
* [ ] - check the code style
* [ ] - code/peer review is completed