import {type Usable, use, useEffect} from "react";
import {getUserAction, type User} from "@/08-use-suspense/api/get-user.action.ts";

interface Props {
    getUser: Usable<User>
}

export const ClientInformation = ({getUser}: Props) => {

    /*
      use
      - Se usa para obtener datos de forma asíncrona y suspensiva.
     */
    const user = use(getUser);

    // useEffect(() => {
    //     getUserAction(id)
    //         .then(console.log)
    // }, [id]);

    return (
        <div className='bg-gradient flex flex-col gap-4'>
            <h2 className='text-4xl font-thin text-white'>{user.name}</h2>
            <p className='text-white text-2xl'>{user.location}</p>
            <p className='text-white text-xl'>{user.role}</p>
        </div>
    )
}