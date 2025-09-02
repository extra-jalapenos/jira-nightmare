class APIClient {
	constructor(baseUrl) {
		this.baseUrl = baseUrl;
		const { username, personalAccessToken } = process.env()
		if (!username || !personalAccessToken) {
			console.error("no username and or personal access token provided -- are you sure this is correct?")
			this.authorization = null
		} else {
			const bearerToken = btoa(`${username}:${personalAccessToken}`)
			this.authorization = `Bearer ${bearerToken}`
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

		if (this.authorization) options.headers.append("Authorization", this.authorization)

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

			let textBody = await error.text()
			let returnError = new Error()
			try {
				const jsonMessage = await JSON.parse(textBody)
				returnError.message = jsonMessage.message
			} catch (e) {
				console.error(e.message)
				returnError.message = textBody
			}
			return returnError
		}
	}
}

const { baseUrl } = process.env()
if (!baseUrl) throw new Error("base url is not defined!")
const JIRA_Client = new APIClient(baseUrl)
export default JIRA_Client
