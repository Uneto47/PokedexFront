import NavBar from "../components/NavBar";

export const Profile = ({ pokemonData }) => {
  console.log(pokemonData)
    return (
      <div>
      <NavBar hideSearch={true}/>
        <div className="Card-pokemon">
            <div className="poke-img-container">
                <img
                    alt={pokemonData.name}
                    src={pokemonData['sprites']['versions']['generation-v']['black-white']['animated']['front_default']}
                    className="pokemon-img" />
            </div>
            <div className="card-body">
                <div className="card-top">
                    <h3> {pokemonData.name} </h3>
                    <div>#{pokemonData.id}</div>
                </div>
                <div className="card-botton">
                    <div className="pokemon-type">
                        {pokemonData.types.map((type, index) => {
                            return (
                                <div key={index} className="pokemon-type-text">{type.type.name}</div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
export default Profile;