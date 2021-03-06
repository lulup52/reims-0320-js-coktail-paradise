import React from 'react';
import Axios from 'axios';
import './randomCocktail.css';
import { Link } from 'react-router-dom';
import './home.css';

class RandomCocktail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randomCocktail: [],
    };
  }

  componentDidMount() {
    this.searchRandomCocktail();
    {console.log(this.state.randomCocktail)}
  }

  searchRandomCocktail = () => {
    Axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((response) => response.data)
      .then((data) => {
        this.setState({ randomCocktail: data.drinks[0] });
      });
  }

  render() {
    return (
      <section className="randomCocktail">
        <div>
          <Link className="random-homeButton" to="/">X</Link>
        </div>
        <h1>{this.state.randomCocktail.strDrink}</h1>
        <div className="randomCocktail-up">
          <img className="randomCocktail-img"
            src={this.state.randomCocktail.strDrinkThumb}
            alt={this.state.randomCocktail.strDrink}
          />
          <div className="randomCocktail-right-img">
            <div className="randomCocktail-ingredients">
              <h3>Ingredient:</h3>
              <ul>
                {Object.keys(this.state.randomCocktail).filter(
                  (key) => key.startsWith('strIngredient') && this.state.randomCocktail[key] != null,
                ).map(
                  (strIngredient) => <li>{this.state.randomCocktail[strIngredient]}</li>,
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="randomCocktail-recipe">
          <h3> Recipe: </h3>
          <p className="cocktailDescription">{this.state.randomCocktail.strInstructions}</p>
        </div>
        <button className="randomCocktail-button" type="button" onClick={this.searchRandomCocktail}>New random cocktail</button>
      </section>
    );
  }
}
export default RandomCocktail;
