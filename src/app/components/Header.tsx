type HeaderProps = Omit<{
	title: string,
} & React.ComponentPropsWithoutRef<"h1">, "id">

export const Header = (props: HeaderProps) => {
	const { title, ...attributes } = props

	return (
		<h1 id="website-title" className="text-white text-5xl font-semibold border-b mb-4" {...attributes}>{title}</h1>
	)
}
