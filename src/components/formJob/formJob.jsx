import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobDetail, createJob, updateJob } from "../../redux/actions/jobActions";
import { useParams, useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
export function FormJob(props) {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const job = useSelector((state) => state.jobs.job);
    const token = useSelector((state) => state.auth.token);
    const [formData, setFormData] = useState({
        title: '',
        job_description: '',
        job_qualification: '',
        job_type: '',
        job_tenure: '',
        job_status: '',
        company_name: '',
        company_image_url: '',
        company_city: '',
        salary_min: '',
        salary_max: ''
    });

    useEffect(() => {
        if (props.title === "Edit") {
            dispatch(fetchJobDetail(id));
        }
    }, [dispatch, id, props.title]);

    useEffect(() => {
        if (props.title === "Edit" && job) {
            console.log('Setting formData with job:', job);
            setFormData({
                title: job.title,
                job_description: job.job_description,
                job_qualification: job.job_qualification,
                job_type: job.job_type,
                job_tenure: job.job_tenure,
                job_status: job.job_status,
                company_name: job.company_name,
                company_image_url: job.company_image_url,
                company_city: job.company_city,
                salary_min: job.salary_min,
                salary_max: job.salary_max
            });
        }
    }, [props.title, job]);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.title === "Edit") {
            dispatch(updateJob(id, formData, token))
              .then(() => navigate(`/job/${id}`)); 
          } else {
            dispatch(createJob(formData, token))
              .then(() => navigate('/job-list'));
        }
    };
    console.log(formData, job);

    return (
        <>
            <h1 className="flex justify-center text-4xl my-10 w-full">{props.title} Job</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-5/6 mx-auto">
                <div className="flex flex-col">
                    <p>Job Title</p>
                    <input 
                        type="text"
                        name="title"
                        placeholder="Job Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="border p-2 mb-4 rounded-lg text-xl"
                    />
                    <p>Job Description</p>
                    <input 
                        type="text"
                        name="job_description"
                        placeholder="Job Description"
                        value={formData.job_description}
                        onChange={handleChange}
                        className="border p-2 mb-4 rounded-lg text-xl"
                    />
                    <p>Job Qualification</p>
                    <input 
                        type="text"
                        name="job_qualification"
                        placeholder="Job Qualification"
                        value={formData.job_qualification}
                        onChange={handleChange}
                        className="border p-2 mb-4 rounded-lg text-xl"
                    />
                    <p>Job Type</p>
                    <input 
                        type="text"
                        name="job_type"
                        placeholder="Job Type"
                        value={formData.job_type}
                        onChange={handleChange}
                        className="border p-2 mb-4 rounded-lg text-xl"
                    />
                    <p>Job Tenure</p>
                    <input 
                        type="text"
                        name="job_tenure"
                        placeholder="Job Tenure"
                        value={formData.job_tenure}
                        onChange={handleChange}
                        className="border p-2 mb-4 rounded-lg text-xl"
                    />
                    <p>Job Status</p>
                    <input 
                        type="number"
                        min={0}
                        max={1}
                        name="job_status"
                        placeholder="Job Status value (1/0)"
                        value={formData.job_status}
                        onChange={handleChange}
                        className="border p-2 mb-4 rounded-lg text-xl"
                    />
                </div>
                <div className="flex flex-col">
                    <p>Company Name</p>
                    <input 
                        type="text"
                        name="company_name"
                        placeholder="Company Name"
                        value={formData.company_name}
                        onChange={handleChange}
                        className="border p-2 mb-4 rounded-lg text-xl"
                    />
                    <p>Company Image URL</p>
                    <input 
                        type="text"
                        name="company_image_url"
                        placeholder="Company Image URL"
                        value={formData.company_image_url}
                        onChange={handleChange}
                        className="border p-2 mb-4 rounded-lg text-xl"
                    />
                    <p>Company City</p>
                    <input 
                        type="text"
                        name="company_city"
                        placeholder="Company City"
                        value={formData.company_city}
                        onChange={handleChange}
                        className="border p-2 mb-4 rounded-lg text-xl"
                    />
                    <p>Salary Minimum</p>
                    <input 
                        type="number"
                        name="salary_min"
                        placeholder="Salary Minimum"
                        value={formData.salary_min}
                        onChange={handleChange}
                        className="border p-2 mb-4 rounded-lg text-xl"
                    />
                    <p>Salary Maximum</p>
                    <input 
                        type="number"
                        name="salary_max"
                        placeholder="Salary Maximum"
                        value={formData.salary_max}
                        onChange={handleChange}
                        className="border p-2 mb-4 rounded-lg text-xl"
                    />
                </div>
            </form>
            <div className="w-5/6 mx-auto flex justify-center mt-6">
                <button 
                    type="submit" 
                    onClick={handleSubmit}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 px-6 py-3 rounded-lg text-xl mb-8"
                >
                    Submit
                </button>
            </div>
        </>
    );
}
