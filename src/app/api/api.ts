// Collection of API functions
// Resources used https://www.datamuse.com, https://rhymebrain.com

function extractDataAfterColon(s: string) {
	return s.substring(s.indexOf(":") + 1, s.length);
}

// +---------------------------+
// |       DATAMUSE API        |
// +---------------------------+

export enum QUERY_FUNCTIONS { // Works with the getChain function
	GET_MEANS_LIKES = "ml",
	GET_SOUNDS_LIKES = "sl",
	GET_SPELLED_LIKES = "sp",
	GET_POPULAR_ADJECTIVES = "rel_jja", // Accompanied with a noun
	GET_POPULAR_NOUNS = "rel_jjb", // Accompanied with an adjective
	GET_SYNONYMS = "rel_syn",
	GET_TRIGGERS = "rel_trg",
	GET_ANTONYMS = "rel_ant",
	GET_HYPERNYMS = "rel_spc",
	GET_HYPONYMS = "rel_gen",
	GET_HOLONYMS = "rel_com",
	GET_MERONYMS = "rel_par",
	GET_FREQUENT_FOLLOWERS = "rel_bga",
	GET_FREQUENT_PREDECESSORS = "rel_bgb",
	GET_PERFECT_RHYMES = "rel_rhy",
	GET_APPROXIMATE_RHYMES = "rel_nry",
	GET_HOMOPHONES = "rel_hom",
	GET_CONSONANT_MATCHES = "rel_cns",
	SET_TOPICS_HINT = "topics",
	SET_LEFT_CONTEXT_HINT = "lc",
	SET_RIGHT_CONTEXT_HINT = "rc",
	SET_MAX = "max",
	GET_METADATA = "md",
	GET_QUERY_ECHO = "qe",
}

export enum QUERY_METADATA { // Probably not used
	DEFINITIONS = "d",
	PARTS_OF_SPEECH = "p",
	SYLLABLE_COUNT = "s",
	PRONUCIATION = "r",
	WORD_FREQUENCY = "f",
}

type Query = string | number | Array<string>;

export async function getWords(callback: Promise<any>) {
	// Run-time function
	// Promise following callback
	let data: Array<Record<string, Query>> = await callback;

	const l = data.map((v: Record<string, Query>) => {
		if (v.word !== undefined) {
			return v.word;
		} else if (v.combined !== undefined) {
			return v.combined;
		} else {
			return v;
		}
	});

	return l;
}

/**
 * Get query requested data from the Datamuse API.
 * @param endpoint API endpoint, [word | sug]
 * @param parameters Query Parameters, Refer to QUERY_FUNCTIONS enum
 * @returns Query request data
 */
async function getQuery(endpoint: string, ...parameters: Array<string>) {
	const route = `/api/datamuse?endpoint=${endpoint}&parameters=${encodeURIComponent(
		parameters.join("&")
	)}`;
	const response = await fetch(route, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		redirect: "error",
	});
	const data = await response.json();

	return data["data"].map((v: Record<string, Query>) => {
		return v; // May change in the future)
	});
}

/**
 * Get chained query requested data from the Datamuse API.
 *
 * This data is not prepared for use with query echo, you will need to
 * manually extract the necessary information used if you plan on using it.
 * @param parameters Query Parameters, Refer to QUERY_FUNCTIONS enum
 * @returns Query request data
 */
export async function getChain(parameters: Array<Array<string>>) {
	const d = parameters.map((v: Array<string>) => {
		return v.length === 2 ? v.join("=") : "";
	});
	return getQuery("words", ...d);
}

export async function getWordInformation(word: string) {
	let result = await getQuery(
		"words",
		`sp=${word}`,
		`qe=${word}`,
		"md=dpsrf",
		"ipa=1",
		"max=1"
	);

	if (result[0]) {
		const temp = [];

		// Cleanup pron, ipa, f
		for (const v of result[0].tags) {
			if (v.indexOf(":") > -1) {
				const k = v.substring(0, v.indexOf(":"));
				const nv = v.substring(v.indexOf(":") + 1, v.length);
				result[0][k] = nv;
			} else {
				temp.push(v);
			}
		}
		// Cleanup sc
		result[0]["pos"] = temp;

		delete result[0].tags;
	}

	return result.length >= 1 ? result[0] : result;
}
export async function getWordDefinition(word: string) {
	const result = await getQuery(
		"words",
		`sp=${word}`,
		`qe=${word}`,
		"md=d",
		"max=1"
	);
	const r = result.length >= 1 ? result[0].defs : result;
	console.log(r);
	return r;
}
export async function getWordPartsOfSpeech(word: string) {
	const result = await getQuery(
		"words",
		`sp=${word}`,
		`qe=${word}`,
		"md=p",
		"max=1"
	);
	return result.length >= 1 ? result[0].tags : result;
}
export async function getWordSyllableCount(word: string) {
	const result = await getQuery(
		"words",
		`sp=${word}`,
		`qe=${word}`,
		"md=s",
		"max=1"
	);
	const r = result.length >= 1 ? result[0].numSyllables : result;
	return r;
}
export async function getWordPronunication(word: string) {
	const result = await getQuery(
		"words",
		`sp=${word}`,
		`qe=${word}`,
		"md=r",
		"max=1"
	);
	const r =
		result.length >= 1 ? extractDataAfterColon(result[0].tags[0]) : result;
	return r;
}
export async function getWordIPA(word: string) {
	const result = await getQuery(
		"words",
		`sp=${word}`,
		`qe=${word}`,
		"md=r",
		"ipa=1",
		"max=1"
	);
	const r =
		result.length >= 1 ? extractDataAfterColon(result[0].tags[1]) : result;
	return r; // Only want IPA information; comes together with pronunication
}
export async function getWordFrequency(word: string) {
	const result = await getQuery(
		"words",
		`sp=${word}`,
		`qe=${word}`,
		"md=f",
		"max=1"
	);
	const r =
		result.length >= 1 ? extractDataAfterColon(result[0].tags[0]) : result;
	return r;
}

export async function getMeansLikes(word: string) {
	return getQuery("words", `ml=${word}`); // Validate and correct unsafe URL characters
}
export async function getSoundsLikes(word: string) {
	return getQuery("words", `sl=${word}`);
}
export async function getSpelledLikes(word: string) {
	return getQuery("words", `sp=${word}`); // You can read on wildcard matches at https://onelook.com/thesaurus/#help
}
export async function getPopularAdjectives(word: string) {
	return getQuery("words", `rel_jja=${word}`);
}
export async function getPopularNouns(word: string) {
	return getQuery("words", `rel_jjb=${word}`);
}
export async function getSynonyms(word: string) {
	return getQuery("words", `rel_syn=${word}`);
}
export async function getTriggers(word: string) {
	return getQuery("words", `rel_trg=${word}`);
}
export async function getAntonyms(word: string) {
	return getQuery("words", `rel_ant=${word}`);
}
export async function getHypernyms(word: string) {
	return getQuery("words", `rel_spc=${word}`);
}
export async function getHyponyms(word: string) {
	return getQuery("words", `rel_gen=${word}`);
}
export async function getHolonyms(word: string) {
	return getQuery("words", `rel_com=${word}`);
}
export async function getMeronyms(word: string) {
	return getQuery("words", `rel_par=${word}`);
}
export async function getFrequentFollowers(word: string) {
	return getQuery("words", `rel_bga=${word}`);
}
export async function getFrequentPredecessors(word: string) {
	return getQuery("words", `rel_bgb=${word}`);
}
export async function getPerfectRhymes(word: string) {
	return getQuery("words", `rel_rhy=${word}`);
}
export async function getApproximateRhymes(word: string) {
	return getQuery("words", `rel_nry=${word}`);
}
export async function getHomophones(word: string) {
	return getQuery("words", `rel_hom=${word}`);
}
export async function getConsonantMatches(word: string) {
	return getQuery("words", `rel_cns=${word}`);
}
export async function getAutocomplete(wordPartial: string) {
	return getQuery("sug", `s=${wordPartial}`);
}
// +-----------------------------+
// |       RHYMEBRAINS API       |
// +-----------------------------+

export async function getPortmanteaus(word: string) {
	const route = `/api/rhymebrain?function=getPortmanteaus&word=${word}`;
	const response = await fetch(route, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		redirect: "error",
	});
	const data = await response.json();

	return data["data"].map((v: Record<string, Query>) => {
		return v;
	});
}
