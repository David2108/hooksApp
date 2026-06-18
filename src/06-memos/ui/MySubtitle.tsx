import {memo} from "react";

export interface Props {
    subtitle: string;
    callMyAPI: () => void;
}

/*
    memo
    - Se usa para memorizar componentes
    - Se usa para evitar que un componente se vuelva a renderizar si sus props no han cambiado
 */
export const MySubtitle = memo(({subtitle, callMyAPI}: Props) => {
    console.log('MySubtitle re-render');
    return (
        <>
            <h6 className='text-2xl font-bold'>{subtitle}</h6>
            <button className='bg-indigo-500 text-white px-2 py-1 rounded-md cursor-pointer'
                    onClick={callMyAPI}
            >
                Llamar a función
            </button>
        </>
    );
})