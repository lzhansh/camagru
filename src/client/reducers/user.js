// const user = {
//     user: {},
//     bioTemp: '',
// }

export const initialState = null;

// export const userReducer = (state, action) => {
//     switch (action.type) {
//         case "USER":
// 			return action.payload;
// 		case "CLEAR":
// 			return null;
//         //     return Object.assign({}, state, {
//         //         user: action.payload
//         //     });
//         // case 'USER_BIOTEMP':
//         //     return Object.assign({}, state, {
//         //         bioTemp: action.payload
//         //     });
//         default:
//             return state;
//     }
// }
export const userReducer = (state,action)=>{
    if(action.type=="USER"){
        return action.payload
    }
    if(action.type=="CLEAR"){
        return null
    }
    // if(action.type=="UPDATE"){
    //     return {
    //         ...state,
    //         followers:action.payload.followers,
    //         following:action.payload.following
    //     }
    // }
    // if(action.type=="UPDATEPIC"){
    //     return {
    //         ...state,
    //         pic:action.payload
    //     }
    // }
    return state
} 
// export default userReducer;