import React from 'react';
import { List } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

type Props = {
    voters: string[];
};

const InfinitScrollVoters = ({ voters }: Props) => {
    if (!voters.length) {
        return <></>;
    }

    return (
        <>
            <div>Voters</div>
            <div
                id="scrollableDiv"
                style={{
                    height: 400,
                    overflow: 'auto',
                    padding: '0 16px',
                }}
            >
                <InfiniteScroll
                    dataLength={voters.length}
                    next={() => {
                        return;
                    }}
                    hasMore={false}
                    loader={<></>}
                    endMessage={<></>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        size="large"
                        bordered
                        dataSource={voters}
                        renderItem={(item) => <List.Item>{item}</List.Item>}
                    />
                </InfiniteScroll>
            </div>
        </>
    );
};

export default InfinitScrollVoters;
