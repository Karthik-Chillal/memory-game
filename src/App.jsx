import { useState, useEffect } from "react";

const CARD_SIZE = 12;
export default function App(){
  //defined states for the game:
  const [cards, setCards] = useState([]);
  const [clicked, setClicked] = useState(new Set());
  const [bestScore, setBestScore] = useState(0);
  const [status, setStatus] = useState("playing");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const controller = new AbortController(); // 1. Create the controller
    const signal = controller.signal;
    // 1. Define an internal async function
    const fetchData = async () => {
      console.log("Fetching started...");
      const data = await fetchAllPokemon(signal);
      console.log('Fetching done:')
      setCards(data);
      setLoading(false);
    };

    // 3. Call it
    fetchData();

    // 4. Clean-Upp function
    return () => {
      controller.abort();
    };
  }, []);


  console.log(cards);
}


async function fetchAllPokemon(signal) {
  const names = [
    "pikachu", "charmander", "squirtle", "bulbasaur",
    "geodude", "magikarp", "mewtwo", "psyduck",
    "ninetales", "rapidash", "onix", "horsea"
  ]

  const results = await Promise.all(
    names.map(name =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, signal)
        .then(r => r.json())
    )
  )

  return results
}

function shuffle(cards) {
  // 1. Create a copy so you don't mutate the original state directly
  const newCards = [...cards];

  // 2. Walk backwards through the array
  for (let i = CARD_SIZE - 1; i > 0; i--) {

    // 3. Pick a random index from 0 to i
    // We use Math.floor to turn the decimal into a whole number index
    const j = Math.floor(Math.random() * (i + 1));

    // 4. Swap elements at i and j
    let temp = newCards[i];
    newCards[i] = newCards[j];
    newCards[j] = temp;
  }

  return newCards;
}