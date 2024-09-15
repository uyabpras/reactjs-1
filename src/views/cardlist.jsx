import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Cardsview } from '../components/cardsView/cardsView';
import Filter from '../components/filter/filter';
import { fetchJobs } from '../redux/actions/jobActions';

export function CardList() {
    const dispatch = useDispatch();
    const jobs = useSelector((state) => state.jobs.jobs);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        dispatch(fetchJobs(filters));
    }, [dispatch, filters]);

    const handleFilterSubmit = (filters) => {
      console.log('Filters received in CardList:', filters);
        setFilters(filters);
    };

    return (
        <>
            <div className='flex flex-wrap flex-row'>
                <div className='text-left mt-24 xl:sticky block top-10 xl:max-h-screen'>
                    <Filter onFilterSubmit={handleFilterSubmit} />
                </div>

                <div className="container mx-auto px-4 py-8">
                    <h2 className="text-center text-2xl font-semibold mb-6">Find your Job</h2>
                    <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8 xl:w-auto">
                        {jobs.map(job => (
                            <Cardsview key={job._id} job={job} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
