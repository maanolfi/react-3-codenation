import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RecipeItem from './RecipeItem'
import { getRecipesByName } from '../services/recipes'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipes: null,
            page: 1
        }
    }

    componentDidMount() {
        this.getRecipes()

    }

    getRecipes = async (page) => {
        const response = await getRecipesByName(this.props.searchString, page)
        this.setState({
            recipes: response
        })

    }

    handleNext = async () => {
        const response = await getRecipesByName(this.props.searchString, this.state.page + 1)
        this.setState({
            recipes: response,
            page: this.state.page + 1
        })

    }

    handlePrevious = async () => {
        const data = await getRecipesByName(this.props.searchString, this.state.page - 1)
        this.setState({
            recipes: data,
            page: this.state.page - 1
        })
    }



    render() {
        if (!this.state.recipes) {
            return <div>Loading...</div>
        }


        return (
            <div>
                <div className='row'>

                    {this.state.recipes.map((recipe, index) => {
                        return (
                            <RecipeItem
                                key={index}
                                recipe={recipe}
                            />
                        )
                    })}
                </div>
                <div className='d-flex justify-content-center'>
                    <nav>
                        <ul className='pagination'>
                            <li className='page-item'>
                                <button
                                    onClick={this.state.page >= 1 ? this.handlePrevious : null}
                                    id='prev'
                                    className='page-link'
                                    href='#'
                                >
                                    Previous
                                </button>
                            </li>
                            <li className='page-item'>
                                <button
                                    onClick={this.handleNext}
                                    id='next'
                                    className='page-link'
                                    href='#'
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div >
        )
    }
}

Home.propTypes = {
    searchString: PropTypes.string,
    recipes: PropTypes.array
}

export default Home