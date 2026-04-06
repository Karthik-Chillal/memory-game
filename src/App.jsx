import { useState } from "react";
function App(){
  const [cards, setCards] = useState([]);
  const [clicked, setClicked] = useState(new Set());
  const [bestScore, setBestScore] = useState(0);
  const [status, setStatus] = useState("playing");
  const [loading, setLoading] = useState(true);
}