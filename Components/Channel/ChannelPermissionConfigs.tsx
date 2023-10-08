import { FC, useState, useEffect } from 'react';

import Spacebar from '../General/Spacebar';
import { ChannelConfigsType } from '@/Dummies/ChannelConfigs';
import { UserChannelPermission } from '@/Dummies/RoleRelation';

type ChannelPermissionConfigsProps = {
    channelSettings: ChannelConfigsType
}

const ChannelPermissionConfigs: FC<ChannelPermissionConfigsProps> = ({ channelSettings }): JSX.Element => {
    const [changesPresent, setChangesPresent] = useState(false);
    
    const [roleRelations, setRoleRelations] = useState(channelSettings.roles);

    const commitChanges = async () => {
        console.log('Committing changes...');
        console.warn(roleRelations);
        console.log('Changes committed!');
    }

    const revertChanges = () => {
        setRoleRelations(channelSettings.roles);
    }

    useEffect(() => {
        const allSame = channelSettings.roles.every((role, index) => {            
            return role.permissions === roleRelations[index].permissions;
        });
        
        if (!allSame) {
            setChangesPresent(true);
            return;
        }
        
        setChangesPresent(false);


    }, [roleRelations, channelSettings.roles]);

    const onEditPermission = (event: React.ChangeEvent<HTMLSelectElement>, editedRoleIndex: number) => {
        const permission = parseInt(event.target.value);

        const newRoles = roleRelations.map((role, index) => {
            if (index === editedRoleIndex) {
                return {
                    ...role,
                    permissions: permission
                }
            }
            
            return role;
        });
        
        setRoleRelations(newRoles);
    }
    
    return (
    <div className='w-full flex flex-col'>
        {JSON.stringify(channelSettings)}

        <ul className='space-y-5 w-full'>
            {
            roleRelations.map((role, index) => 
            <li key={role.id} className='w-full flex flex-row'>
                <span>{role.role_name}</span>
                
                <Spacebar className='w-10' />
                
                <select className='bg-black' defaultValue={channelSettings.roles[index].permissions} onChange={(event) => onEditPermission(event, index)} value={role.permissions}>
                    <option value={UserChannelPermission.invisible}>Invisible</option>
                    <option value={UserChannelPermission.admin}>Admin</option>
                    <option value={UserChannelPermission.write}>Write</option>
                    <option value={UserChannelPermission.read}>Read</option>
                </select>
            </li>
            )
            }
        </ul>



        <Spacebar className='h-20' />

        {
            changesPresent && 
            <div className='w-full h-20 flex flex-row justify-evenly align-center'>
                <button className='bg-red-400 w-40' onClick={revertChanges}>Discard</button>
                <button className='bg-teal-400 w-40' onClick={commitChanges}>Save</button>
            </div>
        }
    </div>
    );
};

export default ChannelPermissionConfigs;