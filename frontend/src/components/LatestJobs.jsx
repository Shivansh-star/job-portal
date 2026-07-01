import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 
import { Sparkles } from 'lucide-react';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
   
    return (
        <div className='max-w-7xl mx-auto my-20 px-4 md:px-8'>
            <div className='flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4'>
                <div>
                    <div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3'>
                        <Sparkles className='w-3 h-3' />
                        <span>Featured Opportunities</span>
                    </div>
                    <h2 className='text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground'>
                        Latest & Top <span className='bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent'>Job Openings</span>
                    </h2>
                </div>
                <p className='text-muted-foreground text-sm max-w-md'>
                    Hand-picked career roles from top tech companies and fast-growing startups actively hiring today.
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
                {!allJobs || allJobs.length <= 0 ? (
                    <div className='col-span-full py-16 text-center bg-card rounded-3xl border border-border/60 shadow-sm'>
                        <p className='text-muted-foreground font-medium'>No job openings available at the moment. Please check back soon!</p>
                    </div>
                ) : (
                    allJobs?.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
                )}
            </div>
        </div>
    )
}

export default LatestJobs