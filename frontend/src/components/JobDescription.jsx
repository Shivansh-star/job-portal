import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT, USER_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { setUser } from '@/redux/authSlice';
import Navbar from './shared/Navbar';
import { Building2, MapPin, Briefcase, DollarSign, Calendar, Users, Bookmark, CheckCircle2, ArrowLeft } from 'lucide-react';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isSaved = user?.profile?.savedJobs?.includes(jobId);

    const toggleSaveHandler = async () => {
        if (!user) {
            toast.error("Please login to save a job.");
            return navigate("/login");
        }
        try {
            const res = await axios.post(`${USER_API_END_POINT}/profile/saveJob/${jobId}`, {}, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
        }
    }

    const applyJobHandler = async () => {
        if (!user) {
            toast.error("Please login to apply.");
            return navigate("/login");
        }
        if (user.role === 'recruiter') {
            toast.error("Recruiters cannot apply for jobs.");
            return;
        }
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...(singleJob?.applications || []), { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Application failed");
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='min-h-screen flex flex-col bg-background'>
            <Navbar />
            <div className='max-w-5xl mx-auto my-10 px-4 md:px-8 flex-1 w-full space-y-8'>
                <Button 
                    variant="ghost" 
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground -ml-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to jobs
                </Button>

                {/* Hero Header Card */}
                <div className='bg-card p-6 sm:p-8 rounded-3xl border border-border/60 shadow-sm space-y-6 relative overflow-hidden'>
                    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-6'>
                        <div className='space-y-2'>
                            <div className='flex items-center gap-2 text-primary font-semibold text-sm'>
                                <Building2 className='w-4 h-4' />
                                <span>{singleJob?.company?.name || "Tech Company"}</span>
                            </div>
                            <h1 className='font-extrabold text-2xl sm:text-3xl md:text-4xl text-foreground tracking-tight'>
                                {singleJob?.title}
                            </h1>
                            <div className='flex items-center gap-3 pt-2 flex-wrap'>
                                <Badge className='text-blue-600 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-400 border-none font-medium px-3 py-1 rounded-full' variant="secondary">
                                    {singleJob?.position || singleJob?.postion} Positions
                                </Badge>
                                <Badge className='text-orange-600 bg-orange-50 dark:bg-orange-950/50 dark:text-orange-400 border-none font-medium px-3 py-1 rounded-full' variant="secondary">
                                    {singleJob?.jobType}
                                </Badge>
                                <Badge className='text-purple-600 bg-purple-50 dark:bg-purple-950/50 dark:text-purple-400 border-none font-medium px-3 py-1 rounded-full' variant="secondary">
                                    ₹{singleJob?.salary} LPA
                                </Badge>
                            </div>
                        </div>

                        <div className='flex items-center gap-3 shrink-0'>
                            <Button 
                                onClick={toggleSaveHandler} 
                                variant="outline" 
                                className={`rounded-full px-5 h-12 font-medium transition-all ${isSaved ? 'bg-primary text-white border-primary hover:bg-primary/90 hover:text-white shadow-sm' : 'hover:border-primary/50 hover:text-primary'}`}
                            >
                                <Bookmark className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                                {isSaved ? 'Saved' : 'Save Job'}
                            </Button>
                            <Button
                                onClick={isApplied ? null : applyJobHandler}
                                disabled={isApplied}
                                className={`rounded-full px-8 h-12 font-semibold transition-all ${isApplied ? 'bg-emerald-600/10 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 cursor-not-allowed border border-emerald-600/20 shadow-none' : 'bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white shadow-md shadow-primary/20'}`}
                            >
                                {isApplied ? (
                                    <span className='flex items-center gap-2'>
                                        <CheckCircle2 className='w-4 h-4' /> Applied
                                    </span>
                                ) : 'Apply Now'}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Structured Details Grid */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='md:col-span-2 bg-card p-6 sm:p-8 rounded-3xl border border-border/60 shadow-sm space-y-6'>
                        <h2 className='font-bold text-xl text-foreground border-b border-border/40 pb-3'>Role Overview & Description</h2>
                        <div className='text-muted-foreground leading-relaxed whitespace-pre-line text-base space-y-4'>
                            {singleJob?.description || "No description provided for this role."}
                        </div>
                    </div>

                    <div className='bg-card p-6 sm:p-8 rounded-3xl border border-border/60 shadow-sm space-y-6 h-fit'>
                        <h3 className='font-bold text-lg text-foreground border-b border-border/40 pb-3'>Job Highlights</h3>
                        
                        <div className='space-y-4 text-sm'>
                            <div className='flex items-start gap-3'>
                                <div className='p-2.5 rounded-xl bg-accent/60 text-primary mt-0.5'>
                                    <MapPin className='w-4 h-4' />
                                </div>
                                <div>
                                    <p className='font-semibold text-foreground'>Location</p>
                                    <p className='text-muted-foreground mt-0.5'>{singleJob?.location || "India"}</p>
                                </div>
                            </div>

                            <div className='flex items-start gap-3'>
                                <div className='p-2.5 rounded-xl bg-accent/60 text-indigo-500 mt-0.5'>
                                    <Briefcase className='w-4 h-4' />
                                </div>
                                <div>
                                    <p className='font-semibold text-foreground'>Experience</p>
                                    <p className='text-muted-foreground mt-0.5'>{singleJob?.experience || 0} years required</p>
                                </div>
                            </div>

                            <div className='flex items-start gap-3'>
                                <div className='p-2.5 rounded-xl bg-accent/60 text-purple-500 mt-0.5'>
                                    <DollarSign className='w-4 h-4' />
                                </div>
                                <div>
                                    <p className='font-semibold text-foreground'>Salary Package</p>
                                    <p className='text-muted-foreground mt-0.5'>₹{singleJob?.salary} LPA</p>
                                </div>
                            </div>

                            <div className='flex items-start gap-3'>
                                <div className='p-2.5 rounded-xl bg-accent/60 text-emerald-500 mt-0.5'>
                                    <Users className='w-4 h-4' />
                                </div>
                                <div>
                                    <p className='font-semibold text-foreground'>Applicants</p>
                                    <p className='text-muted-foreground mt-0.5'>{singleJob?.applications?.length || 0} candidates applied</p>
                                </div>
                            </div>

                            <div className='flex items-start gap-3'>
                                <div className='p-2.5 rounded-xl bg-accent/60 text-amber-500 mt-0.5'>
                                    <Calendar className='w-4 h-4' />
                                </div>
                                <div>
                                    <p className='font-semibold text-foreground'>Posted On</p>
                                    <p className='text-muted-foreground mt-0.5'>{singleJob?.createdAt?.split("T")[0] || "Recently"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription