// const user = {
//     user: {},
//     bioTemp: '',
// }

export const initialState = null;

export const userReducer = (state, action) => {
    switch (action.type) {
        case "USER":
			return action.payload;
		case "CLEAR":
			return null;
        //     return Object.assign({}, state, {
        //         user: action.payload
        //     });
        // case 'USER_BIOTEMP':
        //     return Object.assign({}, state, {
        //         bioTemp: action.payload
        //     });
        default:
            return state;
    }
}

// export default userReducer;