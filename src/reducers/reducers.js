import { combineReducers } from "redux";

import { SET_FILTER, SET_MOVIES } from "../actions/actions";

function visiblityFilter(state='', action){
    switch(action.type){
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}

function movies(state=[],action){
    switch(action.type){
        case SET_MOVIES:
            return action.value;
        default:
            return state;
    }
}

// function moviesApp(state={}, action){
//     return{
//         visiblityFilter: visiblityFilter(stae.visiblityFilter, action),
//         movies: movies(state.movies, action)
//     }
// }

const moviesApp = combineReducers({
    visiblityFilter,
    movies
})
export default moviesApp;