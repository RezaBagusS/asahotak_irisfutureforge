interface PageProps {
    children: React.ReactNode;
}

export default function Page({ children }: PageProps) {
    return <div className="overflow-y-auto">{children}</div>;
}