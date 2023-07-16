function Container({children, className} : {children: React.ReactNode, className?: string}) {
    return (
        <div className={`max-w-screen-xl mx-auto px-3 ${className ? className : ''}`}>
            {children}
        </div>
    );
}

export default Container;