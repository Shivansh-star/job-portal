import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Briefcase } from 'lucide-react';

const Browse = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch])

    return (
        <div className='min-h-screen flex flex-col bg-background'>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 px-4 md:px-8 flex-1 w-full'>
                <div className='flex items-center justify-between pb-6 mb-8 border-b border-border/40'>
                    <div>
                        <div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-2'>
                            <Sparkles className='w-3 h-3' />
                            <span>Explore Catalog</span>
                        </div>
                        <h1 className='font-extrabold text-3xl md:text-4xl text-foreground'>
                            {searchedQuery ? `Results for "${searchedQuery}"` : "All Listed Jobs"}
                        </h1>
                    </div>
                    <span className='px-4 py-1.5 rounded-full bg-accent text-foreground text-sm font-semibold border border-border/60 shadow-sm'>
                        {allJobs?.length || 0} Openings
                    </span>
                </div>

                {!allJobs || allJobs.length <= 0 ? (
                    <div className='flex flex-col items-center justify-center p-20 bg-card rounded-3xl border border-border/60 text-center shadow-sm my-10'>
                        <div className='h-16 w-16 rounded-2xl bg-accent/60 flex items-center justify-center text-muted-foreground mb-4'>
                            <Briefcase className='w-8 h-8' />
                        </div>
                        <h3 className='text-xl font-bold text-foreground'>No jobs available right now</h3>
                        <p className='text-sm text-muted-foreground max-w-sm mt-1'>
                            Please check back later or explore other categories.
                        </p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16'>
                        <AnimatePresence>
                            {allJobs.map((job, index) => (
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
    )
}

export default Browse