import JiraClient from "./JiraApi.js"

// const test = await JiraClient.getMyself()
// console.log(test)

// const test2 = await JiraClient.getJQL(0,10,"project = DATZ ORDER BY created ASC")
// console.log(test2)

const updateIssued = await JiraClient.putIssue("DATZ-692", { "fields": { "summary": "hey from the API" }})
console.log(updateIssued)
