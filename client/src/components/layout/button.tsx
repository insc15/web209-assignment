import React from 'react';

type ButtonProps = {
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

function Button({ as: Tag = 'button', children, className = '', onClick = () => {return;} }: ButtonProps) {
  const Element = Tag ;

  return <Element onClick={onClick} className={`py-2 px-3 bg-primary rounded text-white hover:bg-button-hover duration-150 ${className}`}>{children}</Element>;
}

export default Button;