import { useState } from 'react';

// eslint-disable-next-line react/prop-types
export default function Filter({ onFilterSubmit }) {
    const [filters, setFilters] = useState({
        sortBy: '',
        company_city: '',
        salary_min: '',
        salary_max: '',
        job_status: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submit button clicked');
        console.log(filters)
        onFilterSubmit(filters);
    };
    

    return (
        <div className="w-64 p-4 bg-gray-100 border-r-2 border-teal-400 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Filter</h2>

            <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-2">
                Sort by
            </label>
            <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded mb-4"
            >
                <option value="">Select sort option</option>
                <option value="newest">Newest</option>
                <option value="latest">Latest</option>
                <option value="salaryMin">Salary Min</option>
                <option value="salaryMax">Salary Max</option>
            </select>

            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                City
            </label>
            <input
                name="company_city"
                type="text"
                value={filters.company_city}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Enter city"
            />

            <label htmlFor="salaryMin" className="block text-sm font-medium text-gray-700 mb-2">
                Salary Min
            </label>
            <input
                name="salary_min"
                type="number"
                value={filters.salary_min}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Enter salary Min"
            />

            <label htmlFor="salaryMax" className="block text-sm font-medium text-gray-700 mb-2">
                Salary Max
            </label>
            <input
                name="salary_max"
                type="number"
                value={filters.salary_max}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Enter salary Max"
            />

            <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Status
            </label>
            <div className="flex items-center mb-4">
                <input
                    name="job_status"
                    type="radio"
                    value="fulltime"
                    checked={filters.job_status === 'fulltime'}
                    onChange={handleChange}
                    className="mr-2"
                />
                <label htmlFor="full-time" className="text-sm">Fulltime</label>
            </div>
            <div className="flex items-center mb-4">
                <input
                    name="job_status"
                    type="radio"
                    value="contract"
                    checked={filters.job_status === 'contract'}
                    onChange={handleChange}
                    className="mr-2"
                />
                <label htmlFor="part-time" className="text-sm">Contract</label>
            </div>

            <button
                onClick={handleSubmit}
                className="w-full bg-teal-600 text-white p-3 rounded-lg"
            >
                Submit
            </button>
        </div>
    );
}
