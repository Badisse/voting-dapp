import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

function Button({ children }: Props): JSX.Element {
    return (
        <div className="bg-cyan-300 hover:bg-cyan-500 font-semibold rounded-lg text-sky-800 active:scale-125 transition ease-in-out duration-150 animate-pulse">
            {children}
        </div>
    );
}

export default Button;
