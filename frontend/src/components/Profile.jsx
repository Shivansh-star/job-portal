import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, FileText, Sparkles, Bookmark, Briefcase } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import SavedJobsTable from './SavedJobsTable'
import useGetAllJobs from '@/hooks/useGetAllJobs'

const Profile = () => {
    useGetAppliedJobs();
    useGetAllJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    const hasResume = Boolean(user?.profile?.resume);

    return (
        <div className='min-h-screen flex flex-col bg-background pb-16'>
            <Navbar />
            
            <div className='max-w-5xl mx-auto px-4 md:px-8 w-full mt-8 space-y-8'>
                {/* Profile Header Card */}
                <div className='bg-card border border-border/60 shadow-md rounded-3xl p-6 sm:p-8 relative overflow-hidden'>
                    <div className='absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 via-indigo-500/5 to-transparent rounded-bl-full pointer-events-none' />

                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10'>
                        <div className='flex items-center gap-5'>
                            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-2 border-primary/20 shadow-md ring-4 ring-primary/5">
                                <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} className="object-cover" />
                                <AvatarFallback className="bg-gradient-to-tr from-primary to-indigo-600 text-white text-2xl font-bold">
                                    {user?.fullname?.charAt(0) || 'U'}
                                </AvatarFallback>
                            </Avatar>
                            <div className='space-y-1'>
                                <div className='flex items-center gap-2'>
                                    <h1 className='font-extrabold text-2xl sm:text-3xl text-foreground tracking-tight'>{user?.fullname || "User Profile"}</h1>
                                    <span className='px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold capitalize'>
                                        {user?.role || "Candidate"}
                                    </span>
                                </div>
                                <p className='text-muted-foreground text-sm max-w-md line-clamp-2 leading-relaxed'>
                                    {user?.profile?.bio || "No bio added yet. Click edit to add a brief introduction about your career goals."}
                                </p>
                            </div>
                        </div>

                        <Button 
                            onClick={() => setOpen(true)} 
                            className="rounded-full px-5 bg-accent hover:bg-primary hover:text-white border border-border/80 text-foreground transition-all duration-200 shadow-sm shrink-0 flex items-center gap-2 font-medium"
                        >
                            <Pen className="w-4 h-4" /> Edit Profile
                        </Button>
                    </div>

                    <hr className='my-6 border-border/40' />

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='space-y-4'>
                            <h3 className='font-semibold text-sm tracking-wide uppercase text-muted-foreground flex items-center gap-2'>
                                <Contact className='w-4 h-4 text-primary' /> Contact Details
                            </h3>
                            <div className='space-y-2.5 text-sm pl-1'>
                                <div className='flex items-center gap-3 text-foreground font-medium'>
                                    <div className='h-8 w-8 rounded-xl bg-accent/60 flex items-center justify-center text-primary shrink-0'>
                                        <Mail className='w-4 h-4' />
                                    </div>
                                    <span className='truncate'>{user?.email || "No email"}</span>
                                </div>
                                <div className='flex items-center gap-3 text-foreground font-medium'>
                                    <div className='h-8 w-8 rounded-xl bg-accent/60 flex items-center justify-center text-indigo-500 shrink-0'>
                                        <Contact className='w-4 h-4' />
                                    </div>
                                    <span>{user?.phoneNumber || "No phone number added"}</span>
                                </div>
                            </div>
                        </div>

                        <div className='space-y-4'>
                            <h3 className='font-semibold text-sm tracking-wide uppercase text-muted-foreground flex items-center gap-2'>
                                <Sparkles className='w-4 h-4 text-primary' /> Key Skills & Competencies
                            </h3>
                            <div className='flex items-center gap-2 flex-wrap pl-1'>
                                {user?.profile?.skills && user?.profile?.skills.length > 0 ? (
                                    user.profile.skills.map((item, index) => (
                                        <Badge key={index} className="bg-primary/10 text-primary border border-primary/20 font-medium px-3 py-1 rounded-full">
                                            {item}
                                        </Badge>
                                    ))
                                ) : (
                                    <span className='text-sm text-muted-foreground italic'>No skills listed yet. Add your technical stack!</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='mt-6 pt-6 border-t border-border/40 flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <div className='h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 shrink-0'>
                                <FileText className='w-5 h-5' />
                            </div>
                            <div>
                                <Label className="text-sm font-semibold text-foreground cursor-pointer">Candidate Resume</Label>
                                <p className='text-xs text-muted-foreground'>Attached CV for employer reviews</p>
                            </div>
                        </div>
                        <div>
                            {hasResume ? (
                                <a 
                                    target='_blank' 
                                    rel='noopener noreferrer'
                                    href={user?.profile?.resume} 
                                    className='px-4 py-2 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-colors shadow-sm inline-block'
                                >
                                    {user?.profile?.resumeOriginalName || "View Resume"}
                                </a>
                            ) : (
                                <span className='text-xs font-medium px-3 py-1.5 rounded-xl bg-accent text-muted-foreground'>Not uploaded</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Saved Jobs Card */}
                <div className='bg-card border border-border/60 shadow-sm rounded-3xl p-6 sm:p-8 space-y-6'>
                    <div className='flex items-center gap-2 border-b border-border/40 pb-4'>
                        <Bookmark className='w-5 h-5 text-primary' />
                        <h2 className='font-bold text-xl text-foreground'>Saved Opportunities</h2>
                    </div>
                    <SavedJobsTable />
                </div>

                {/* Applied Jobs Card */}
                <div className='bg-card border border-border/60 shadow-sm rounded-3xl p-6 sm:p-8 space-y-6'>
                    <div className='flex items-center gap-2 border-b border-border/40 pb-4'>
                        <Briefcase className='w-5 h-5 text-primary' />
                        <h2 className='font-bold text-xl text-foreground'>Application History</h2>
                    </div>
                    <AppliedJobTable />
                </div>
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile