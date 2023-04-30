// More information at https://rhymebrain.com/api.html
// Please note the 350 queries per hour restriction limit

import { NextResponse } from "next/server";

/**
 * GET Request for Rhymebrain related queries
 * You can call this function like http://localhost:3000/api/rhymebrain?parameters=["function=getRhymes","word=sly"]
 * @param req Web request
 * @returns JSON data from the related query
 */
export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	let parameters = searchParams.get("parameters");
	if (parameters !== null) {
		parameters = JSON.parse(parameters).join("&");
	}

	const res = await fetch(`https://rhymebrain.com/talk?${parameters}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await res.json();

	return NextResponse.json({ data });
}
