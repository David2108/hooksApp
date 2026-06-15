import {useRef} from "react";

export const FocusScreen = () => {

    /*
      - useRef no permite re-renderizar el componente
      - Permite mantener el valor de una variable entre renderizados
      - Se debe inicializar con useRef(null)
      - Se puede acceder al valor de la variable con inputRef.current
      - Para enlazar el ref con un elemento del DOM se usa el atributo ref={inputRef}
     */
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        inputRef.current?.select();
    }

    return (
        <div className='bg-gradient flex flex-col gap-4'>
            <h1 className='text-2xl font-thin text-white'>
                <input type="text"
                       ref={inputRef}
                       className='bg-white text-black px-4 py-2 rounded-md'
                       autoFocus/>
                <button
                    className='bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer'
                    onClick={handleClick}
                >
                    Set focus
                </button>
            </h1>
        </div>
    )
}