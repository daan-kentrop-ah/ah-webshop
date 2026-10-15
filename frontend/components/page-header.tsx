export default function PageHeader({title, subtitle}: {title: string; subtitle?: string}) {
    return (
        <div className="w-full border-b-1 border-gray-300 pb-2">
            <h1 className={"text-sky-500 font-bold text-2xl"}>{title}</h1>
            {subtitle && <h2 className={"italic text-sky-600 text-sm"}>{subtitle}</h2>}
        </div>
    )
}