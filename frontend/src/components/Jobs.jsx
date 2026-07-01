import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className='min-h-screen flex flex-col bg-background'>
            <Navbar />
            <div className='max-w-7xl mx-auto my-8 px-4 md:px-8 flex-1 w-full'>
                <div className='flex flex-col lg:flex-row gap-8 items-start'>
                    {/* Sidebar Filter */}
                    <div className='w-full lg:w-72 shrink-0 lg:sticky lg:top-24'>
                        <FilterCard />
                    </div>

                    {/* Jobs Grid Container */}
                    <div className='flex-1 w-full'>
                        <div className='flex items-center justify-between mb-6 pb-4 border-b border-border/40'>
                            <div>
                                <h1 className='text-2xl font-bold text-foreground'>All Opportunities</h1>
                                <p className='text-sm text-muted-foreground'>Showing results based on your criteria</p>
                            </div>
                            <span className='px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold'>
                                {filterJobs?.length || 0} Jobs Found
                            </span>
                        </div>

                        {filterJobs?.length <= 0 ? (
                            <div className='flex flex-col items-center justify-center p-16 bg-card rounded-3xl border border-border/60 text-center shadow-sm'>
                                <div className='h-16 w-16 rounded-2xl bg-accent/60 flex items-center justify-center text-muted-foreground mb-4'>
                                    <Briefcase className='w-8 h-8' />
                                </div>
                                <h3 className='text-xl font-bold text-foreground'>No jobs found</h3>
                                <p className='text-sm text-muted-foreground max-w-sm mt-1'>
                                    Try adjusting your search query or removing filters to find what you're looking for.
                                </p>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 pb-12'>
                                <AnimatePresence>
                                    {filterJobs.map((job, index) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            key={job?._id}
                                        >
                                            <Job job={job} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs