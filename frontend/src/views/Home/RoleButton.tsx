import React from 'react';
import useEth from '../../contexts/EthContext/useEth';
import { actions } from '../../contexts/EthContext/state';
import Role from '../../types/role.types';
import Button from '../../components/Button';

type Props = {
    userRole: Role;
};

function RoleButton({ userRole }: Props): JSX.Element {
    const { dispatch } = useEth();

    const handleClick = (): void => {
        dispatch({
            type: actions.setRole,
            payload: { userRole },
        });
    };

    return (
        <Button>
            <button type="button" className="p-3" onClick={handleClick}>
                {userRole?.name}
            </button>
        </Button>
    );
}

export default RoleButton;
