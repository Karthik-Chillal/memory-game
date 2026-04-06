import { useState, useEffect } from "react";
import Card from "./components/Cards";
import Header from "./components/header"

const CARD_SIZE = 12;
export default function App(){
  //defined states for the game:
  const [cards, setCards] = useState([]);
  const [clicked, setClicked] = useState(new Set());
  const [bestScore, setBestScore] = useState(0);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState('playing');
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

  const handleCardClick = (id)=>{
    if(clicked.has(id)){
      setStatus('loss')
      setScore(0)
      setClicked(new Set())
      return
    }
    else{
      const temp = new Set(clicked);
      temp.add(id);
      setClicked(temp)
      setBestScore(Math.max(temp.size, bestScore));
      setScore(temp.size)
      if(temp.size == cards.length){
        setStatus("win");
        setClicked(new Set())
        return
      }
      console.log(bestScore, status)
      // console.log(clicked);
    }
    setCards(shuffle(cards));
  }
  if(loading) return <p>Loading...</p>
  console.log(cards);
  return (
    <div>
      <Header bestScore={bestScore} currScore={score}></Header>
      <div className="grid">
        {cards.map(card => (
          <Card key={card.id} card={card} clickHandler={handleCardClick} />
        ))}
      </div>
    </div>
  )
}


async function fetchAllPokemon(signal) {
  const names = [
    "pikachu", "charmander", "squirtle", "bulbasaur",
    "geodude", "magikarp", "mewtwo", "psyduck",
    "ninetales", "rapidash", "onix", "hitmonchan"
  ]

  const results = await Promise.all(
    names.map(name =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, signal)
        .then(r => r.json())
        .then((data)=>{
          return {
            'name': data.name,
            'type':data.types[0].type.name,
            'gen' : data.past_stats[0].generation.name,
            'image': data.sprites.front_default,
            'id' : data.name
          }
        })
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