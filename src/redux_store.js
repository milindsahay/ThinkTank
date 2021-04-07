import { createStore } from 'redux'
const initialState = {user: {displayName: "Default", photoURL: "default", email: "default"}, posts: []}

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'user/set':
            return { ...state, user: action.user  }
        case 'posts/set':
            return { ...state, posts: action.posts }
        default:
            return state
    }
}

export const store = createStore(reducer)

