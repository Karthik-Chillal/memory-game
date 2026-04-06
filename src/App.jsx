import { useState, useEffect } from "react";

export default function App(){
  //defined states for the game:
  const [cards, setCards] = useState([]);
  const [clicked, setClicked] = useState(new Set());
  const [bestScore, setBestScore] = useState(0);
  const [status, setStatus] = useState("playing");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // 1. Define an internal async function
    const checkData = async () => {
      console.log("Fetching started...");
      const data = await fetchAllPokemon();

      // 2. This is what you're looking for!
      console.log("Fetched Pokemon Data:", data);

      setLoading(false);
    };

    // 3. Call it
    checkData();
  }, []);
}


async function fetchAllPokemon() {
  const names = [
    "pikachu", "charmander", "squirtle", "bulbasaur",
    "geodude", "magikarp", "mewtwo", "psyduck",
    "ninetales", "rapidash", "onix", "horsea", "tauros"
  ]

  const results = await Promise.all(
    names.map(name =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(r => r.json())
    )
  )

  return results
}