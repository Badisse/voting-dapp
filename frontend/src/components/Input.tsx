import React from 'react';

type Props = {
    value: string;
    placeHolder: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
};

function Input({ value, onChange, placeHolder }: Props): JSX.Element {
    return (
        <input
            type="text"
            className="form-control
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-cyan-300 focus:outline-none"
            placeholder={placeHolder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}

export default Input;
