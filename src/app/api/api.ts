// Main collection of API functions for the lyrics application
// Special thanks for resources to [https://www.datamuse.com, https://rhymebrain.com]
//
// TODO: Stringify functions need to be removed from return statements if using for non-html_element use.
// 			 Need to review over whats needed

// Datamuse API
/**
 * Get query information from the Datamuse API.
 * @param endpoint Endpoint ("words" | "sug")
 * @param parameters Fully listed query parameters
 * @return An object/collection of query information
 */
export async function getQuery(endpoint: string, ...parameters: Array<string>) {
	const link = `/api/datamuse?endpoint=${endpoint}&parameters=${JSON.stringify(
		parameters
	).replaceAll(" ", "+")}`;
	const res = await fetch(link, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await res.json();

	return JSON.stringify(
		data["data"].map((v) => {
			return v.word;
		})
	);
}

// Rhymebrain API - TODO feels broken and unsure of use besides getPortmanteau
/**
 * Get the collection of rhyming words most closely associated with the original
 * @param word Any English vocabulary word
 * @param max (optional) Maximum number of results
 * @returns An object/collection of rhyming words
 */
export async function getRhyming(word: string, max?: number) {
	const link =
		`/api/rhymebrain?parameters=["function=getRhymes","word=${word}"` +
		(max !== undefined ? `,"maxResults=${max}"]` : "]");
	const res = await fetch(link, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await res.json();

	return JSON.stringify(data["data"]);
}

/**
 * Get phonetic information from a word
 * @param word Any English vocabulary word
 * @param max (optional) Maximum number of results
 * @returns The word information
 */
export async function getWordInfo(word: string) {
	const link = `/api/rhymebrain?parameters=["function=getWordInfo","word=${word}"]`;
	const res = await fetch(link, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await res.json();
	return JSON.stringify(data["data"]);
}

/**
 * Get the portmanteaus (related combined-words) to the given word.
 * @param word Any English vocabulary word
 * @param max (optional) Maximum number of results
 * @returns An object/collection of portmanteaus
 */
export async function getPortmanteau(word: string, max?: number) {
	const link =
		`/api/rhymebrain?parameters=["function=getPortmanteaus", "word=${word}"` +
		(max !== undefined ? `,"maxResults=${max}"]` : "]");
	const res = await fetch(link, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await res.json();
	return JSON.stringify(data["data"]);
}
