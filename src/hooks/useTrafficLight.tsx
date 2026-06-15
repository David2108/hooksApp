import {useEffect, useState} from "react";
import {colors, type TrafficLightColor} from "../02-useEffect/TrafficLightWithHook.tsx";

export const useTrafficLight = () => {

    const [light, setLight] = useState<TrafficLightColor>('red');
    const [countDown, setCountDown] = useState(5);

    const nextLight: Record<TrafficLightColor, TrafficLightColor> = {
        red: 'green',
        yellow: 'red',
        green: 'yellow',
    };

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

    return {
        // Props
        countDown,

        // Computed
        percentage: (countDown / 5) * 100,
        greenLight: light === 'green' ? colors.green : 'bg-gray-500',
        yellowLight: light === 'yellow' ? colors.yellow : 'bg-gray-500',
        redLight: light === 'red' ? colors.red : 'bg-gray-500',

        // Methods
    }
}