import {useEffect, useState} from "react";

export const TrafficLightWithEffect = () => {

    const colors = {
        red: 'bg-red-500 animate-pulse',
        yellow: 'bg-yellow-500 animate-pulse',
        green: 'bg-green-500 animate-pulse'
    }

    // type TrafficLightColor = 'red' | 'yellow' | 'green';
    type TrafficLightColor = keyof typeof colors;

    const [light, setLight] = useState<TrafficLightColor>('red');
    const [countDown, setCountDown] = useState(5);

    const nextLight: Record<TrafficLightColor, TrafficLightColor> = {
        red: 'green',
        yellow: 'red',
        green: 'yellow',
    };

    /*
      - useEffect se ejecuta tras el montaje y cuando cambian sus dependencias
      - useEffect(() => {}, [dependencies]);
      - La función de limpieza (return) se ejecuta al desmontar o antes de re-ejecutar el efecto
      - Los useEffect deben ser atómicos: una sola responsabilidad por efecto
     */

    // Efecto 1: solo cuenta atrás
    useEffect(() => {
        if (countDown === 0) return;

        const intervalId = setInterval(() => {
            setCountDown(prev => prev - 1);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [countDown]);

    // Efecto 2: solo cambia la luz cuando termina la cuenta atrás
    useEffect(() => {
        if (countDown !== 0) return;

        const timeoutId = setTimeout(() => {
            setLight(prevLight => nextLight[prevLight]);
            setCountDown(5);
        }, 0);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [countDown, nextLight]);

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
            <div className="flex flex-col items-center space-y-8">

                <h1 className='text-white text-3xl font-thin'>Semáforo de useEffect</h1>
                <h2 className='text-white text-xl'>Countdown: {countDown}</h2>

                <div className='w-64 bg-gray-700 rounded-full h-2'>
                    <div className='bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-linear'
                    style={{width: `${countDown/5 * 100}%`}}
                    ></div>
                </div>

                <div className={`w-32 h-32 ${light === 'red' ? colors[light] : 'bg-gray-500'} rounded-full`}></div>
                <div className={`w-32 h-32 ${light === 'yellow' ? colors[light] : 'bg-gray-500'} rounded-full`}></div>
                <div className={`w-32 h-32 ${light === 'green' ? colors[light] : 'bg-gray-500'} rounded-full`}></div>

            </div>
        </div>
    );
};