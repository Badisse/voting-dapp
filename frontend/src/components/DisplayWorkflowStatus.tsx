import React from 'react';
import { Steps } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { WORKFLOW_STATUS_STRING } from '../constants/workflowStatus';
import AntCustomTheme from '../themes/AntCustomTheme';

type Props = {
    currentWorkflowStatus: number | undefined;
};

type Item = {
    title: string;
    icon?: JSX.Element;
};

function DisplayWorkflowStatus({ currentWorkflowStatus }: Props) {
    let items: Item[] = [];

    WORKFLOW_STATUS_STRING.forEach((workfloStatus, idx) => {
        let item: Item = {
            title: workfloStatus,
        };

        if (currentWorkflowStatus === idx) {
            item = {
                ...item,
                icon: <LoadingOutlined />,
            };
        }

        items = [...items, item];
    });

    return (
        <div className="">
            <AntCustomTheme>
                <Steps direction="vertical" current={currentWorkflowStatus} items={items} />
            </AntCustomTheme>
        </div>
    );
}

export default DisplayWorkflowStatus;
