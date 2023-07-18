function Section({ children, className } : { children: React.ReactNode, className?: string}) {
    return (
        <section className={`relative ${className ? className : ''} py-8 overflow-hidden`}>
            {children}
        </section>
    );
}

export default Section;