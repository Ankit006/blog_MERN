import {initialState} from "../initialState.js";
import {LOGIN_USERNAME,LOGIN_PASSWORD} from "../stateConstant.js";

const loginReducer = (state = initialState,action)=>{
    switch(action.type){
        case LOGIN_USERNAME:
            return {
                ...state,
                username:action.payload
            }
        case LOGIN_PASSWORD:
            return {
                ...state,
                password:action.payload
            }
        default:
            return state        
    }
}

export default loginReducer;