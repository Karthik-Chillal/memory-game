export default function Card({ card, onClick }){

  return(
    <div
      className="card"
      onClick={()=> clickHandler(card.id)}
    >
      <div
        className="card-image"
      >
        <img src="{card.image}" alt="{card.name}" />
      </div>
      <div
        className="card-desc"
      >
        <div className="card-name">{card.name}</div>
        <div className="card-type">{card.type}</div>
        <div className="card-gen">{card.gen}</div>
        <div className="card-moves">{card.moves}</div>

      </div>

    </div>
  )
}