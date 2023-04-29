import '@/app/globals.css'
import { Site } from '@config/site'

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
				{children}
			</body>
		</html>
	)
}
