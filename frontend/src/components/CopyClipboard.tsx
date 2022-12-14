import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FaCopy } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';

type Props = {
    text: string;
};

function CopyClipboard({ text }: Props) {
    const [isCopied, setCopied] = useState<boolean>(false);

    const handleCopy = () => {
        setCopied(true);
    };

    useEffect(() => {
        isCopied &&
            setTimeout(() => {
                setCopied(false);
            }, 1000);
    }, [isCopied]);

    return (
        <>
            {isCopied && (
                <>
                    <CopyToClipboard text={text} onCopy={() => handleCopy()}>
                        <button data-tip="copied">
                            <FaCopy size="1em" />
                        </button>
                    </CopyToClipboard>
                    <ReactTooltip delayHide={1000} effect="solid" />
                </>
            )}
            {!isCopied && (
                <>
                    <CopyToClipboard text={text} onCopy={() => handleCopy()}>
                        <button data-tip="copy">
                            <FaCopy size="1em" />
                        </button>
                    </CopyToClipboard>
                    <ReactTooltip effect="solid" />
                </>
            )}
        </>
    );
}

export default CopyClipboard;
