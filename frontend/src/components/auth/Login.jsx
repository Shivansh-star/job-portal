import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Sparkles, UserCheck, Briefcase } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const selectRole = (role) => {
        setInput({ ...input, role });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!input.role) {
            toast.error("Please select your role (Student or Recruiter)");
            return;
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Invalid credentials");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className='min-h-screen flex flex-col bg-background relative overflow-hidden'>
            <Navbar />
            
            {/* Subtle ambient lighting */}
            <div className='absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[130px] rounded-full pointer-events-none -z-10' />

            <div className='flex-1 flex items-center justify-center p-4 my-8'>
                <div className='w-full max-w-md bg-card/90 backdrop-blur-xl border border-border/80 rounded-3xl p-8 shadow-xl relative overflow-hidden'>
                    <div className='text-center space-y-2 mb-8'>
                        <div className='h-12 w-12 rounded-2xl bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center text-white mx-auto shadow-md shadow-primary/20'>
                            <Sparkles className='w-6 h-6' />
                        </div>
                        <h1 className='font-extrabold text-2xl md:text-3xl text-foreground tracking-tight'>Welcome Back</h1>
                        <p className='text-sm text-muted-foreground'>Enter your credentials to access your account</p>
                    </div>

                    <form onSubmit={submitHandler} className='space-y-5'>
                        <div className='space-y-2'>
                            <Label className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Email Address</Label>
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="name@example.com"
                                required
                                className="h-12 rounded-xl bg-background/50 border-border/80 focus:border-primary focus:ring-primary/20"
                            />
                        </div>

                        <div className='space-y-2'>
                            <div className='flex items-center justify-between'>
                                <Label className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Password</Label>
                                <a href="#" className='text-xs text-primary hover:underline font-medium'>Forgot password?</a>
                            </div>
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="••••••••"
                                required
                                className="h-12 rounded-xl bg-background/50 border-border/80 focus:border-primary focus:ring-primary/20"
                            />
                        </div>

                        <div className='space-y-2 pt-1'>
                            <Label className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Select Your Role</Label>
                            <div className='grid grid-cols-2 gap-3'>
                                <button
                                    type="button"
                                    onClick={() => selectRole('student')}
                                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-medium text-sm transition-all ${input.role === 'student' ? 'border-primary bg-primary/10 text-primary shadow-sm' : 'border-border/60 bg-background/40 text-muted-foreground hover:border-border'}`}
                                >
                                    <UserCheck className='w-4 h-4' />
                                    <span>Job Seeker</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => selectRole('recruiter')}
                                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-medium text-sm transition-all ${input.role === 'recruiter' ? 'border-primary bg-primary/10 text-primary shadow-sm' : 'border-border/60 bg-background/40 text-muted-foreground hover:border-border'}`}
                                >
                                    <Briefcase className='w-4 h-4' />
                                    <span>Recruiter</span>
                                </button>
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            disabled={loading}
                            className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white font-semibold shadow-md shadow-primary/20 transition-all mt-2"
                        >
                            {loading ? (
                                <span className='flex items-center gap-2'>
                                    <Loader2 className='h-5 w-5 animate-spin' /> Logging in...
                                </span>
                            ) : "Sign In"}
                        </Button>

                        <div className='text-center pt-2'>
                            <span className='text-sm text-muted-foreground'>
                                Don't have an account? <Link to="/signup" className='text-primary font-semibold hover:underline ml-1'>Sign up</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login