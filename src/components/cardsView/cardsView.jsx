/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

export function Cardsview({ job }) {
  const statusColor = job.job_status === 1 ? 'bg-green-500' : 'bg-gray-500';
  const jobsID = job._id;

  return (
    <Link to={`/job/${jobsID}`} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-row mb-6 relative">
      <img 
        src={job.company_image_url} 
        alt={job.company_name} 
        className="w-1/4 bg-cover bg-center border border-gray-300" 
      />
      <div className="p-4 w-3/4 flex flex-col justify-between relative">
        <div 
          className={`absolute top-0 right-0 p-2 text-sm text-white rounded-lg mb-8 mx-1 ${statusColor}`}
        >
          {job.job_status === 1 ? 'Available' : 'Not Available'}
        </div>
        <div className="flex justify-between mt-10">
          <div>
            <p className="text-lg font-bold">{job.company_name}</p>
            <p className="text-md text-gray-600">{job.title}</p>
            <p className="text-sm text-gray-500">{job.company_city}</p>
          </div>
          <div className="text-right md:block hidden">
            <p className="text-md">{job.job_type}</p>
            <p className="text-sm text-gray-600">{job.job_tenure}</p>
            <p className="text-md font-semibold">Rp.{job.salary_min} - Rp.{job.salary_max}</p>
          </div>
        </div>
        <div className="bg-gray-100 p-3 mt-4">
          <p className="text-sm text-gray-700">{job.job_qualification}</p>
        </div>
      </div>
    </Link>
  );
}
