// You can find more information at https://www.datamuse.com/api/
// Please note the 100,000 per day non-API key restriction limit

import { NextResponse } from "next/server";

/**
 * GET Request for Datamuse related queries.
 * You can call this function like http://localhost:3000/api/datamuse?endpoint=words&parameters=["ml=goodbye"]
 * The Datamuse queries are seperated into the following: /[ENDPOINT]?[QUERY_PARAMETERS]
 * @param req Web request
 * @returns JSON data from the related query
 */
export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const endpoint = searchParams.get("endpoint");
	let parameters = searchParams.get("parameters");
	if (parameters !== null) {
		parameters = JSON.parse(parameters).join("&");
	}

	const link = `https://api.datamuse.com/${endpoint}?${parameters}`;

	const res = await fetch(link, {
		headers: { "Content-Type": "application/json" },
	});
	const data = await res.json();

	return NextResponse.json({ data });
}
