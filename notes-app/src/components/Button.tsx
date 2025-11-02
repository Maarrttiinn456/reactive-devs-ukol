import type { ComponentPropsWithoutRef } from 'react';

type ButtonProps = {
    variant: 'red' | 'gray';
    text: string;
} & ComponentPropsWithoutRef<'button'>;

const Button = ({ variant, text, ...props }: ButtonProps) => {
    let buttonClass;

    if (variant === 'red') {
        buttonClass = 'bg-red-700  hover:bg-red-600';
    } else {
        buttonClass = 'bg-gray-700 hover:bg-gray-600';
    }

    return (
        <button
            className={`px-3 py-1 rounded text-white transition cursor-pointer ${buttonClass}`}
            {...props}
        >
            {text}
        </button>
    );
};

export default Button;
