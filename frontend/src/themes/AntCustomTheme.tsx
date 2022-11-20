import React, { ReactNode } from 'react';
import { ConfigProvider } from 'antd';

type Props = {
    children: ReactNode;
};

function AntCustomTheme({ children }: Props) {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Steps: {
                        colorPrimary: '#0891b2',
                        colorText: '#fbfcfd',
                        colorTextDescription: '#93A3B9',
                        colorFillContent: '#93A3B9',
                    },
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
}

export default AntCustomTheme;
