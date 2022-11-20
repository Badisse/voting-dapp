import React from 'react';
import RoleButton from './RoleButton';
import ROLES from '../../constants/roles';

function ChooseRole(): JSX.Element {
    return (
        <div className="flex flex-col items-center justify-around w-full md:w-1/3 h-1/4 bg-gradient-to-t from-cyan-700 rounded-2xl">
            <div className="text-lg font-medium">Select a Role</div>
            <div className="flex justify-around items-center w-2/3">
                <div>
                    <RoleButton userRole={ROLES.admin} />
                </div>

                <div>
                    <RoleButton userRole={ROLES.voter} />
                </div>
            </div>
        </div>
    );
}

export default ChooseRole;
