import JiraClient from "./JiraApi.js"

// const disU = await JiraClient.getMyself()
// console.log(disU)

// const simpleJQL = await JiraClient.getJQL(0,10,"project = ABC ORDER BY created ASC")
// console.log(simpleJQL)

const updatedIssue = await JiraClient.putIssue("ABC-123", { "fields": { "summary": "hey from the API" }})
console.log(updatedIssue)
