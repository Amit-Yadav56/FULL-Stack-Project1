//export the action type
//whenever any action(like fetching the user) we need to set a action type

export const actionType = {
    SET_USER: 'SET_USER'
}

const reducer = (state, action) => {
    console.log(action)
    console.log(state)
    //switch statement that evaluates the action.type to determine how to update the state.
    switch (action.type) {
        //In the case where action.type is 'SET_USER', it returns a new state object with the user property updated to the value of action.user.
        case actionType.SET_USER:
            return {
                ...state,//create shallow copy of state
                user: action.user,

            }
        default:
            return state;
    }
};

export default reducer