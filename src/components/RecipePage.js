import React, { Component } from 'react'
import RecipeItem from './RecipeItem'
import { getRecipesByName, getRecipesByIngredients } from '../services/recipes'


class RecipePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipe: {
                thumbnail: '',
                title: '',
                ingredients: ''
            },
            data: [],
            loading: true
        }
    }

    componentDidMount() {
        const { searchString } = this.props
        this.getRecipes(searchString)
    }

    async componentDidUpdate(prevProps, prevState) {
        const { ingredients } = this.state.recipe
        const result = await getRecipesByIngredients(ingredients)

        const filteredOnes = result.filter(ele => {
            return ele.title !== this.state.recipe.title
        })

        this.setState({ data: filteredOnes.splice(0, 4) })
    }

    getRecipes = async searchString => {
        await getRecipesByName(searchString, this.state.page).then(recipe => {
            this.setState({ recipe: recipe.shift(), loading: false })
        })
    }

    render() {
        const { thumbnail, title, ingredients } = this.state.recipe
        const { data } = this.state

        return (
            <React.Fragment>
                {!this.state.loading ? (
                    <div>
                        <img src={thumbnail} alt={title} />
                        <div className='card-body'>
                            <h5 className='card-title'>{title}</h5>
                            <p className='card-text'>
                                <strong>Ingredients: </strong>
                                {ingredients}
                            </p>
                            <h5 className='card-title'>Similar recipes</h5>
                            <div className='row'>
                                {data.map((recipe, index) => {
                                    return (
                                        <RecipeItem
                                            key={index}
                                            recipe={recipe}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                ) : null}
            </React.Fragment>
        )
    }
}

export default RecipePage