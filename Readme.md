# About this repo
This repo is intended as sort of code collection / client for the JIRA API (https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#version).
While the postman collection is nifty, please note the following things:
1. Every request has "Basic Auth" preconfigured, saying you should use your username and apiToken. This will not work and instead result in 401 responses. Auth method Bearer token with the personal access token will work instead.
2. Every request says to use version 3. For some requests -- e.g. /rest/api/3/myself -- this will lead to 302 responses. When queried with /latest/myself, it yields a 200 and the response body lists version 2: "self": "https://jira.eon.com/rest/api/2/myself

Bottom line: I've had reliable results through modifying the .json file before an import into Postman by deleting the "auth": {...} keys so it'll revert to "inherit from parent" and replace every instance of /rest/api/3/ with /rest/api/latest/.
# How to use
1. Clone this repo.
2. Have node installed / nvm.
3. Have your personal access token for jira at hand. (How do you get one? Please consult Atlassian's own documentation here: https://confluence.atlassian.com/enterprise/using-personal-access-tokens-1026032365.html)
4. Create an .env file by duplicating the .env.example and fill out your info.
