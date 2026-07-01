import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { Building2, MapPin, ArrowUpRight } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className='group p-6 rounded-3xl bg-card border border-border/60 cursor-pointer hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden'
        >
            <div className='space-y-4'>
                <div className='flex items-center justify-between gap-3'>
                    <div className='flex items-center gap-3'>
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
                    <div className='h-9 w-9 rounded-full bg-accent/50 group-hover:bg-primary group-hover:text-white flex items-center justify-center text-muted-foreground transition-all duration-300 shrink-0'>
                        <ArrowUpRight className='w-4 h-4' />
                    </div>
                </div>

                <div>
                    <h2 className='font-bold text-xl text-foreground line-clamp-1 group-hover:text-primary transition-colors'>{job?.title}</h2>
                    <p className='text-sm text-muted-foreground line-clamp-2 mt-2 leading-relaxed'>{job?.description}</p>
                </div>
            </div>

            <div className='flex items-center gap-2 mt-6 pt-4 border-t border-border/40 flex-wrap'>
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
    )
}

export default LatestJobCards