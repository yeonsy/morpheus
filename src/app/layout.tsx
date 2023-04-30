import { Site } from '@config/site'
import { Header } from '@/app/components/Header'

import '@/app/globals.css'


export const metadata = {
	title: Site.title,
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>
				<div className="flex flex-col h-full">
					<div id="header" className="mx-1">
						<Header title={Site.title} />
					</div>
					<div id="page-content" className="grow mx-2">
						{children}
					</div>
				</div>
			</body>
		</html>
	)
}
