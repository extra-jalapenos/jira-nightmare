class APIClient {
	constructor(baseUrl) {
		this.baseUrl = baseUrl;
		const { personalAccessToken } = process.env
		if (!personalAccessToken) {
			console.error("no personal access token provided -- are you sure this is correct?")
			this.authorization = null
		} else {
			this.authorization = `Bearer ${personalAccessToken}`
		}
	}

	async makeRequest (uri, method, body, type = "application/json") {
	if (!["get", "put", "patch", "post", "delete"].includes(method.toLowerCase()))
		throw new Error(`invalid method call: tried to ${method.toUpperCase()}: ${uri}`)

	try {
		const options = {
			headers: {
				"Content-Type": type
			},
			body: JSON.stringify(body),
			method: method.toUpperCase() || "GET",
			credentials: "include"
		}

		if (this.authorization) options.headers["Authorization"] = this.authorization

		const response = await fetch(`${this.baseUrl}${uri}`, options)

		if (!response.ok) throw response;

		const textBody = await response.text()

		try {
			return await JSON.parse(textBody)
		} catch (error) {
			return textBody || true
		}

		} catch (error) {
			console.error(error.message)
			return error
		}
	}

	async getMyself () {
		const result = await this.makeRequest("/rest/api/latest/myself", "GET")
		console.log(`Hi ${result.emailAddress}!`)
		return result
	}

	async getJQL (startAt, maxResults, jql, fields="id,summary") {
		return await this.makeRequest(`/rest/api/latest/search?expand=&jql=${jql}&fields=${fields}&maxResults=${maxResults}&startAt=${startAt}`, "GET")
	}

	async putIssue(idOrKey, body) {
		return await this.makeRequest(`/rest/api/latest/issue/${idOrKey}`, "PUT", body)
	}
}

const { baseUrl } = process.env
if (!baseUrl) throw new Error("baseUrl is not defined!")
const JiraClient = new APIClient(baseUrl)
export default JiraClient
