const Header = ({bestScore, currScore})=>{
  return(
    <header className="head">
      <h1>PokeMemory</h1>
      <div className="scores">
        <div className="best-score">{bestScore}</div>
        <div className="curr-score">{currScore}</div>
      </div>
    </header>
  )
}
export default Header