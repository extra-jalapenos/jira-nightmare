import JiraClient from "./JiraApi.js"

await JiraClient.getMyself()

// const getIssues = async (startAt, maxResults, jql) => {
// 	const requestOptions = {
// 		method: 'GET',
// 		headers: myHeaders,
// 		redirect: 'follow'
// 	};

// 	// returns -- if successful -- an array of objects with necessary information
// 	try {
// 		const response = await fetch(`https://jira.eon.com/rest/api/latest/search?expand=&jql=${jql}&fields=id,customfield_36849&maxResults=${maxResults}&startAt=${startAt}`, requestOptions)
// 		const data = await response.json()
// 		if (response.status !== 200) throw new Error("couldn't get a 200 response")

// 		const items = data.issues.map(item => {
// 		return {
// 				id: item.id,
// 				key: item.key,
// 				old_id: item.fields.customfield_36849
// 			}
// 		})

// 		return items
// 	} catch (error) {
// 		console.log('error', error)
// 	}
// }


// const updateIssue = async (itemStats) => {
// 	const changeRequestOptions = {
// 		method: 'PUT',
// 		headers: myHeaders,
// 		redirect: 'follow'
// 	};

// 	// id is natively a number, while old id is a string
// 	if (itemStats.old_id === String(itemStats.id)) return "no change needed"

// 	const body = {
// 		"fields": {
// 			"customfield_36849": itemStats.id
// 		}
// 	}

// 	changeRequestOptions["body"] = JSON.stringify(body)
// 	try {
// 		const response = await fetch(`https://jira.eon.com/rest/api/latest/issue/${itemStats.key}`, changeRequestOptions)
// 		if (response.status !== 204) throw new Error("couldn't change issue: " + itemStats.key)
// 		console.log(itemStats.key, "successfully changed")
// 		return response.status
// 	} catch (error) {
// 		console.error(error.message)
// 		return
// 	}
// }


// const config = {
// 	startAt: 3000,
// 	maxResults: 1000,
// 	jql: "project = ITREQ4BAG ORDER BY created ASC"
// }

// const changeIssues = async (issueArr) => {
// 	console.log("issues found", issueArr.length)
// 	if (issueArr.length === 0) return Error("no issues found")

// 	const issuesToChange = issueArr.filter(issue => issue.old_id !== String(issue.id))
// 	console.log("issues to change", issuesToChange.length)
// 	if (issuesToChange.length === 0) return Error("no issues to change")

// 	const resultsOfChange = await issuesToChange.map(issue => updateIssue(issue))
// 	return resultsOfChange
// }

// const delay = ms => new Promise(res => setTimeout(res, ms));

// const chunkSize = 50
// for (let i=3600; i < 16000; i+=chunkSize) {
// 	const issueData = await getIssues(i, chunkSize, config.jql)
// 	const changed = await changeIssues(issueData)
// 	console.log(changed)
// 	if (changed instanceof Error) {
// 		console.error(changed.message)
// 		await delay(2 * 1000)
// 	} else {
// 		console.log("continuing")
// 		await delay(2 * 60 * 1000)
// 	}
// }
