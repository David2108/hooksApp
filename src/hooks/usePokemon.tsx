import {useEffect, useState} from "react";

interface Pokemon {
    id: number;
    name: string;
    imageUrl: string;
}

interface Props {
    id: number;
}

export const usePokemon = ({id}: Props) => {

    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [isLoading, setIsLoading] = useState(true)

    const pokemonById = async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const {name} = await response.json();
        setPokemon({
            id,
            name: name,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        });
        setIsLoading(false);
    }

    /*
      - En los hooks no se puede usar async/await
      - En los hooks no se puede usar try/catch
     */
    useEffect(() => {
        const intervalId = setInterval(async () => {
            await pokemonById();
        }, 0);
        return () => clearInterval(intervalId);
    }, [id]);

    return {
        pokemon,
        isLoading,

        formattedId: id.toString().padStart(3, "0")
    }
}