export default function Card({ card, clickHandler }){

  return(
    <div
      className="card"
      onClick={()=> clickHandler(card.id)}
    >
      <div
        className="card-image"
      >
        <img src={card.image} alt={card.name} />
      </div>
      <div
        className="card-desc"
      >
        <div className="card-name">Name:  {card.name}</div>
        <div className="card-type">Type:  {card.type}</div>
        <div className="card-gen">Generation: {card.gen}</div>

      </div>

    </div>
  )
}