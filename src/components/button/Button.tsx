import React from 'react';
import './button.scss'

interface buttonType {
    children?: string | JSX.Element,
    className?: string,
    onClick?: () => void;
}

export const Button = ({ children, className }: buttonType) => (
<button className={`btn ${className}`}>
    {children}
</button>
)

export const OutLineButton = ({ children, onClick, className }: buttonType) => (
    <button className={`btn outLineButton ${className}`} onClick={onClick}>
        {children}
    </button>
)