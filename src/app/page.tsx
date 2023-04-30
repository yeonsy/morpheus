import { LyricsEditor } from "@components/LyricsEditor";

export default function EditorPage() {
	return (
		<div id="editor-page" className="flex h-full">
			<div className="flex-auto">
				<LyricsEditor />
			</div>
			<span className="flex-auto spacer" />
		</div>
	)
}
