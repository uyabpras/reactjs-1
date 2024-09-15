import axios from 'axios';

export const fetchJobs = (filters) => async (dispatch) => {
    try {
        const params = new URLSearchParams(filters).toString();
        const response = await axios.get(`https://job-vacancy-api.vercel.app/api/jobs/?${params}`);
        dispatch({
            type: 'FETCH_JOBS_SUCCESS',
            payload: response.data,
        });
    } catch (error) {
        console.error('Error fetching jobs', error);
    }
};

export const fetchJobDetail = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`https://job-vacancy-api.vercel.app/api/jobs/${id}`);
        dispatch({
            type: 'FETCH_JOB_DETAIL_SUCCESS',
            payload: response.data,
        });
    } catch (error) {
        console.error('Error fetching job detail', error);
    }
};

export const createJob = (jobData, token) => async (dispatch) => {
    try {
        const response = await axios.post(
            "https://job-vacancy-api.vercel.app/api/jobs",
            jobData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.status === 201 || response.status === 200) {
        dispatch({
            type: 'CREATE_JOB_SUCCESS',
            payload: response.data,
        });
    } else {
        throw new Error('create job failed with status: ' + response.status);
      }  
    } catch (error) {
        console.error('Error creating job', error);
    }
};

export const updateJob = (id, jobData, token) => async (dispatch) => {
    try {
        const response = await axios.put(
            `https://job-vacancy-api.vercel.app/api/jobs/${id}`,
            jobData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.status === 201 || response.status === 200) {
        dispatch({
            type: 'UPDATE_JOB_SUCCESS',
            payload: response.data,
        });
    } else {
        throw new Error('update job failed with status: ' + response.status);
      } 
    } catch (error) {
        console.error('Error updating job', error);
    }
};

export const deleteJob = (id, token) => async (dispatch) => {
    try {
        const response = await axios.delete(`https://job-vacancy-api.vercel.app/api/jobs/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 201 || response.status === 200) {
        dispatch({
            type: 'DELETE_JOB_SUCCESS',
            payload: id,
        });
    } else {
        throw new Error('delete job failed with status: ' + response.status);
      } 
    } catch (error) {
        console.error('Error deleting job', error);
    }
};
