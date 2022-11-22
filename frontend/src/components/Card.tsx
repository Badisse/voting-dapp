import React, { ReactNode } from 'react';

type Props = {
    className?: string;
    children: ReactNode;
};

function Card({ children, className }: Props): JSX.Element {
    return (
        <div
            className={`flex flex-col items-center justify-between gap-10 bg-gradient-to-t from-cyan-700 to-sky-800 rounded-2xl p-12 w-full ${
                className ? className : 'h-full'
            }`}
        >
            {children}
        </div>
    );
}

export default Card;
