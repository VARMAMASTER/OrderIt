import{
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS,
    ORDER_DETAILS_SUCCESS,
}from "../Constants/orderConstants";

const initialState={
    loading:false,
    error:null,
    order:null,
}

export const newOrderReducer = (state=initialState,action)=>{
    switch(action.type){
        case CREATE_ORDER_REQUEST:
            return{
                ...state,
                laoding:true,
            };

        case CREATE_ORDER_SUCCESS:
            return{
                loading:false,
                order:action.payload,
            }
        
            case CREATE_ORDER_FAIL:
                return{
                    loading:false,
                    error:action.payload,
                };
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null,
                };
            default:
                return state;

    }
}

export const myOrdersReducers = (state={orders:[]},action)=>{
    switch(action.type){
        case MY_ORDER_REQUEST:
            return{
                laoding:true,
            };

        case MY_ORDER_SUCCESS:
            return{
                loading:false,
                orders:action.payload,
            };
        
            case MY_ORDER_FAIL:
                return{
                    loading:false,
                    error:action.payload,
                };
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null,
                };
            default:
                return state;

    }
}



export const orderDetailsReducer = (state={order:{}},action)=>{
    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return{
                laoding:true,
            };

        case ORDER_DETAILS_SUCCESS:
            return{
                loading:false,
                order:action.payload,
            };
        
            case ORDER_DETAILS_FAIL:
                return{
                    loading:false,
                    error:action.payload,
                };
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null,
                };
            default:
                return state;

    }
}

