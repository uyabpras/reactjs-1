const initialState = {
    token: null,
    user: null,
    isAuthenticated: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                user: action.payload.user,
                error: null
            };
        case 'LOGIN_ERROR':
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                error: action.payload,
            };
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                user: action.payload.user,
                error: null
            };
        case 'FETCH_USER_SUCCESS':
            return {
                    ...state,
                    user: action.payload,
                    isAuthenticated: true,
                    error: null,
                };
        case 'FETCH_USER_ERROR':
            return {
                    ...state,
                    error: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                error: null,
            };
        default:
            return state;
    }
};

export default authReducer;
