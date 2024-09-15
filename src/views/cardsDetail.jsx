import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteJob, fetchJobDetail } from '../redux/actions/jobActions';

export function CardsDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const job = useSelector((state) => state.jobs.job);
    const token = useSelector((state) => state.auth.token);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        dispatch(fetchJobDetail(id));
    }, [dispatch, id]);

    const handleDelete = async () => {
        dispatch(deleteJob(id, token))
            .then(() => navigate('/job-list'))
            .catch((error) => {
                console.error('Error deleting job:', error);
            });
    };

    if (!job) return <p>Loading...</p>;

    const statusColor = job.job_status === 1 ? 'bg-green-500' : 'bg-gray-500';

    return (
        <>
            <div className="flex flex-wrap flex-col mt-8">
                <img src={job.company_image_url} alt={job.company_name} className='flex object-fill h-96 w-3/4 mx-auto shadow-md shadow-gray-400 border rounded-md'/>
                <div className="container grid grid-cols-1 md:grid-cols-2 border w-3/4 mx-auto py-10 text-lg">
                    <div className="px-3">
                        <p className='md:block md:hidden border border-slate-700 pl-1 text-center'>Job Status: {job.job_status === 1 ? 'Available' : 'Not Available'}</p>
                        <p>Company Name: {job.company_name}</p>
                        <p>Job Title: {job.title}</p>
                        <p>City: {job.company_city}</p>
                        <p>Job Tenure: {job.job_tenure}</p>
                    </div>
                    <div className="md:ml-40 px-10">
                        <p 
                            className={`py-2 text-sm text-white rounded-lg mx-1 text-center hidden md:block ${statusColor}`}
                        >
                            {job.job_status === 1 ? 'Available' : 'Not Available'}
                        </p>
                        <p>Job Qualification: {job.job_qualification}</p>
                        <p>Job Type: {job.job_type}</p>
                        <p>Salary: Rp.{job.salary_min} - Rp.{job.salary_max}</p>
                    </div>
                </div>
                <p className="container border w-3/4 h-1/3 mx-auto py-5 px-3 mb-40 rounded-b-md bg-gray-300 text-justify">
                    {job.job_description}                  
                </p>
            </div>
            {isAuthenticated ? (
                <div className="sticky bottom-0 w-full bg-white shadow-lg flex justify-around p-4">
                    <Link to={`/edit/${job._id}`}>
                        <button className="border rounded-lg bg-amber-400 text-2xl md:px-10 py-3">
                            Edit
                        </button>
                    </Link>
                    <button className="border rounded-lg bg-blue-500 text-2xl md:px-24 py-3">
                        Submit
                    </button>
                    <button className="border rounded-lg bg-rose-600 text-2xl md:px-10 py-3"
                    onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            ):(
                <>
                    <div className="sticky bottom-0 w-full bg-white shadow-lg flex justify-around p-4">
                        <button disabled className="border rounded-lg bg-gray-500 text-2xl md:px-24 py-3">
                            Submit
                        </button>
                    </div>
                </>
            )}
        </>
    );
}
