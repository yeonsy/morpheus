'use client'

import React, { useEffect, useRef, useState} from 'react'

import { EditorView, keymap } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { defaultKeymap } from '@codemirror/commands'

import { getPortmanteau, getRhyming, getWordInfo, getQuery, getWords } from "@api/api";

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
		setData(getQuery("words", "rel_rhy=word", "max=10"));
	}, [])

	return (
		<div ref={cmWrapper} className="text-white border-4 border-blue-300 rounded-md h-full">
			{data}
		</div>
	)
}
