'use client'

import React, { useEffect, useRef } from 'react'

import { EditorView, keymap } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { defaultKeymap } from '@codemirror/commands'

export const LyricsEditor = () => {
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

	return (
		<div ref={cmWrapper} className="text-white border-4 border-blue-300 rounded-md h-full"></div>
	)
}
