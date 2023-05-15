'use client'

import React, { useEffect, useRef, useState} from 'react'

import { EditorView, keymap } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { defaultKeymap } from '@codemirror/commands'

import * as API from "@api/api";

export const LyricsEditor = () => {
	const [data, setData] = useState([]);

	const cmWrapper = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const cm = new EditorView({
			state: EditorState.create({
				doc: '',
				extensions: [
					keymap.of(defaultKeymap),
				]
			}),
			parent: cmWrapper.current!,
		})

		return () => {
			cm.destroy()
		}
	}, [])

	useEffect(() => {
		setData( // Your making a lot of API GET calls all at once!
			[//API.getChain([[API.QUERY_FUNCTIONS.GET_PERFECT_RHYMES, "word"], [API.QUERY_FUNCTIONS.SET_MAX, "20"]]),
			 //API.getWordInformation("Goodbye"),
			 API.getWordDefinition("Goodbye"),
			 //API.getWordPartsOfSpeech("Goodbye"),
			 //API.getWordSyllableCount("Goodbye"),
			 //API.getWordPronunication("Goodbye"),
			 //API.getWordIPA("Goodbye");
			 //API.getWordFrequency("Goodbye"),
			 //API.getWords(API.getMeansLikes("Goodbye Forever")),
			 //API.getWords(API.getSoundsLikes("Goodbye")),
			 //API.getWords(API.getSpelledLikes("Goo??*")),
			 //API.getWords(API.getPopularAdjectives("Goodbye")),
			 //API.getWords(API.getPopularNouns("Goodbye")),
			 //API.getWords(API.getSynonyms("Goodbye")),
			 //API.getWords(API.getTriggers("Goodbye")),
			 //API.getWords(API.getAntonyms("Goodbye")),
			 //API.getWords(API.getHypernyms("Goodbye")),
			 //API.getWords(API.getHyponyms("Goodbye")),
			 //API.getWords(API.getHolonyms("Goodbye")),
			 //API.getWords(API.getMeronyms("Goodbye")),
			 //API.getWords(API.getFrequentFollowers("Goodbye")),
			 //API.getWords(API.getFrequentPredecessors("Goodbye")),
			 //API.getWords(API.getPerfectRhymes("Goodbye")),
			 //API.getWords(API.getApproximateRhymes("Goodbye")),
			 //API.getWords(API.getHomophones("Goodbye")),
			 //API.getWords(API.getConsonantMatches("Goodbye")),
			 //API.getWords(API.getAutocomplete("Salu")),
			 //API.getWords(API.getPortmanteaus("Goodbye")),
			]
		)
	}, [])

	return (
		<div ref={cmWrapper} className="text-white border-4 border-blue-300 rounded-md h-full">
		</div>
	)
	//{data.map((v: Array<Record<string, any>>, i: number) => { return <p key={i}>{v}</p>;})}
}
