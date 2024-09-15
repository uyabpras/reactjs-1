const initialState = {
    jobs: [],
    job: null,
};

const jobReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_JOBS_SUCCESS':
            return {
                ...state,
                jobs: action.payload,
            };
        case 'FETCH_JOB_DETAIL_SUCCESS':
            return {
                ...state,
                job: action.payload,
            };
        case 'CREATE_JOB_SUCCESS':
            return {
                ...state,
                jobs: [...state.jobs, action.payload],
            };
        case 'UPDATE_JOB_SUCCESS':
            return {
                ...state,
                jobs: state.jobs.map((job) =>
                    job.id === action.payload.id ? action.payload : job
                ),
            };
        case 'DELETE_JOB_SUCCESS':
            return {
                ...state,
                jobs: state.jobs.filter((job) => job.id !== action.payload),
            };
        default:
            return state;
    }
};

export default jobReducer;
