import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { LogOut, User2, Bookmark, Sparkles } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { setAllAppliedJobs } from '@/redux/jobSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                dispatch(setAllAppliedJobs([]));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    }

    const isActive = (path) => location.pathname === path;

    return (
        <header className='sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm transition-all duration-300'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-8'>
                <Link to="/" className='flex items-center gap-2 group'>
                    <div className='h-9 w-9 rounded-xl bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform duration-300'>
                        <Sparkles className='h-5 w-5' />
                    </div>
                    <span className='text-2xl font-extrabold tracking-tight text-foreground'>
                        Next<span className='bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent'>Role</span>
                    </span>
                </Link>

                <div className='flex items-center gap-8'>
                    <ul className='hidden md:flex font-medium items-center gap-8 text-sm'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li>
                                    <Link 
                                        to="/admin/companies" 
                                        className={`transition-colors py-1 relative ${isActive('/admin/companies') ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'}`}
                                    >
                                        Companies
                                        {isActive('/admin/companies') && <span className='absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full' />}
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/admin/jobs" 
                                        className={`transition-colors py-1 relative ${isActive('/admin/jobs') ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'}`}
                                    >
                                        Jobs
                                        {isActive('/admin/jobs') && <span className='absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full' />}
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link 
                                        to="/" 
                                        className={`transition-colors py-1 relative ${isActive('/') ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'}`}
                                    >
                                        Home
                                        {isActive('/') && <span className='absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full' />}
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/jobs" 
                                        className={`transition-colors py-1 relative ${isActive('/jobs') ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'}`}
                                    >
                                        Jobs
                                        {isActive('/jobs') && <span className='absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full' />}
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/browse" 
                                        className={`transition-colors py-1 relative ${isActive('/browse') ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'}`}
                                    >
                                        Browse
                                        {isActive('/browse') && <span className='absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full' />}
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {!user ? (
                        <div className='flex items-center gap-3'>
                            <Link to="/login">
                                <Button variant="ghost" className='rounded-full px-5 font-medium hover:bg-accent/60'>
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className='rounded-full px-6 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 font-medium'>
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-200">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                    <AvatarFallback className="bg-gradient-to-tr from-primary to-indigo-600 text-white font-semibold">
                                        {user?.fullname?.charAt(0) || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-4 rounded-2xl shadow-xl border border-border/60 backdrop-blur-xl bg-card/95" align="end">
                                <div className='flex gap-3 items-center pb-3 border-b border-border/40'>
                                    <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                        <AvatarFallback className="bg-gradient-to-tr from-primary to-indigo-600 text-white font-semibold text-lg">
                                            {user?.fullname?.charAt(0) || 'U'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className='overflow-hidden'>
                                        <h4 className='font-semibold text-foreground truncate'>{user?.fullname}</h4>
                                        <p className='text-xs text-muted-foreground truncate'>{user?.profile?.bio || (user?.role === 'recruiter' ? 'Recruiter Account' : 'Job Seeker')}</p>
                                    </div>
                                </div>

                                <div className='flex flex-col pt-2 space-y-1 text-sm'>
                                    {user && user.role === 'student' && (
                                        <>
                                            <Link to="/profile">
                                                <div className='flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-accent/60 text-foreground transition-colors cursor-pointer'>
                                                    <User2 className='h-4 w-4 text-primary' />
                                                    <span className='font-medium'>View Profile</span>
                                                </div>
                                            </Link>
                                            <Link to="/profile">
                                                <div className='flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-accent/60 text-foreground transition-colors cursor-pointer'>
                                                    <Bookmark className='h-4 w-4 text-primary' />
                                                    <span className='font-medium'>Saved Jobs</span>
                                                </div>
                                            </Link>
                                        </>
                                    )}

                                    <div 
                                        onClick={logoutHandler} 
                                        className='flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-destructive/10 text-destructive transition-colors cursor-pointer mt-1'
                                    >
                                        <LogOut className='h-4 w-4' />
                                        <span className='font-medium'>Logout</span>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Navbar