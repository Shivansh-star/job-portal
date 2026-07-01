import React from 'react'
import { Button } from './ui/button'
import { Bookmark, Building2, MapPin, Clock } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'

const Job = ({ job }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);

    const isSaved = user?.profile?.savedJobs?.includes(job?._id);

    const toggleSaveHandler = async (e) => {
        e.stopPropagation();
        if (!user) {
            toast.error("Please login to save a job.");
            return navigate("/login");
        }
        try {
            const res = await axios.post(`${USER_API_END_POINT}/profile/saveJob/${job._id}`, {}, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
        }
    }

    const daysAgoFunction = (mongodbTime) => {
        if (!mongodbTime) return 0;
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }
    
    const daysAgo = daysAgoFunction(job?.createdAt);

    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className='group p-6 rounded-3xl bg-card border border-border/60 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full'
        >
            <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                    <div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/60 text-muted-foreground text-xs font-medium'>
                        <Clock className='w-3.5 h-3.5' />
                        <span>{daysAgo === 0 ? "Posted Today" : `${daysAgo} days ago`}</span>
                    </div>
                    <Button 
                        onClick={toggleSaveHandler} 
                        variant="outline" 
                        size="icon"
                        className={`h-9 w-9 rounded-full transition-all duration-200 z-10 ${isSaved ? 'bg-primary text-white border-primary hover:bg-primary/90 hover:text-white shadow-sm' : 'hover:border-primary/50 hover:text-primary'}`} 
                    >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </Button>
                </div>

                <div className='flex items-center gap-3 pt-1'>
                    <Avatar className="h-12 w-12 rounded-2xl border border-border/60 p-1 bg-background shadow-sm">
                        <AvatarImage src={job?.company?.logo} alt={job?.company?.name} className="rounded-xl object-contain" />
                        <AvatarFallback className="rounded-xl bg-primary/10 text-primary font-bold text-base">
                            {job?.company?.name?.charAt(0) || <Building2 className="w-5 h-5" />}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className='font-semibold text-base text-foreground group-hover:text-primary transition-colors'>{job?.company?.name || "Tech Company"}</h3>
                        <div className='flex items-center gap-1 text-xs text-muted-foreground mt-0.5'>
                            <MapPin className='w-3 h-3 text-muted-foreground' />
                            <span>{job?.location || "India"}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className='font-bold text-xl text-foreground line-clamp-1 group-hover:text-primary transition-colors'>{job?.title}</h2>
                    <p className='text-sm text-muted-foreground line-clamp-3 mt-2 leading-relaxed'>{job?.description}</p>
                </div>

                <div className='flex items-center gap-2 pt-2 flex-wrap'>
                    <Badge className='text-blue-600 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-400 border-none font-medium px-3 py-1 rounded-full' variant="secondary">
                        {job?.position} Positions
                    </Badge>
                    <Badge className='text-orange-600 bg-orange-50 dark:bg-orange-950/50 dark:text-orange-400 border-none font-medium px-3 py-1 rounded-full' variant="secondary">
                        {job?.jobType}
                    </Badge>
                    <Badge className='text-purple-600 bg-purple-50 dark:bg-purple-950/50 dark:text-purple-400 border-none font-medium px-3 py-1 rounded-full' variant="secondary">
                        ₹{job?.salary} LPA
                    </Badge>
                </div>
            </div>

            <div className='flex items-center gap-3 mt-6 pt-4 border-t border-border/40'>
                <Button 
                    onClick={(e) => { e.stopPropagation(); navigate(`/description/${job?._id}`) }} 
                    variant="outline" 
                    className="flex-1 rounded-full font-medium border-border/80 hover:bg-accent hover:text-foreground"
                >
                    Details
                </Button>
                <Button 
                    onClick={toggleSaveHandler} 
                    className={`flex-1 rounded-full font-medium shadow-sm transition-all duration-200 z-10 ${isSaved ? 'bg-muted text-muted-foreground hover:bg-muted/90 border border-border/60' : 'bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white shadow-primary/20'}`}
                >
                    {isSaved ? 'Saved' : 'Save For Later'}
                </Button>
            </div>
        </div>
    )
}

export default Job