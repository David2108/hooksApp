import {MyTitle} from "@/06-memos/ui/MyTitle.tsx";
import {useCallback, useState} from "react";
import {MySubtitle} from "@/06-memos/ui/MySubtitle.tsx";

export const MemoHook = () => {

    const [title, setTitle] = useState('Hola')
    const [subtitle, setSubtitle] = useState('Mundo')

    /*
       useCallback
       - Se usa para memorizar funciones
       - Se usa para evitar que una función se vuelva a crear cada vez que se renderiza el componente
     */
    const handleMyAPI = useCallback(() => {
        console.log('Llamando a la API');
    }, []);

    return (
        <div className='bg-gradient flex flex-col gap-4'>
            <h1 className='text-2xl font-thin text-white'>MemoApp</h1>

            <MyTitle title={title}/>
            <MySubtitle subtitle={subtitle} callMyAPI={handleMyAPI}/>

            <button className='bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer'
                    onClick={() => setTitle('Hello')}
            >
                Cambiar título
            </button>

            <button className='bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer'
                    onClick={() => setSubtitle('World')}
            >
                Cambiar subtítulo
            </button>
        </div>
    );
}