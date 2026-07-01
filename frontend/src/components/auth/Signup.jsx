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
import { setLoading } from '@/redux/authSlice'
import { Loader2, Sparkles, UserCheck, Briefcase, Upload } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
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
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Registration failed");
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

            {/* Ambient lighting */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[140px] rounded-full pointer-events-none -z-10' />

            <div className='flex-1 flex items-center justify-center p-4 my-8'>
                <div className='w-full max-w-lg bg-card/90 backdrop-blur-xl border border-border/80 rounded-3xl p-8 shadow-xl relative overflow-hidden'>
                    <div className='text-center space-y-2 mb-8'>
                        <div className='h-12 w-12 rounded-2xl bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center text-white mx-auto shadow-md shadow-primary/20'>
                            <Sparkles className='w-6 h-6' />
                        </div>
                        <h1 className='font-extrabold text-2xl md:text-3xl text-foreground tracking-tight'>Create an Account</h1>
                        <p className='text-sm text-muted-foreground'>Join NextRole to discover opportunities or hire top talent</p>
                    </div>

                    <form onSubmit={submitHandler} className='space-y-4'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='space-y-2'>
                                <Label className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Full Name</Label>
                                <Input
                                    type="text"
                                    value={input.fullname}
                                    name="fullname"
                                    onChange={changeEventHandler}
                                    placeholder="John Doe"
                                    required
                                    className="h-11 rounded-xl bg-background/50 border-border/80 focus:border-primary focus:ring-primary/20"
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Phone Number</Label>
                                <Input
                                    type="tel"
                                    value={input.phoneNumber}
                                    name="phoneNumber"
                                    onChange={changeEventHandler}
                                    placeholder="+91 98765 43210"
                                    required
                                    className="h-11 rounded-xl bg-background/50 border-border/80 focus:border-primary focus:ring-primary/20"
                                />
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <Label className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Email Address</Label>
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="name@example.com"
                                required
                                className="h-11 rounded-xl bg-background/50 border-border/80 focus:border-primary focus:ring-primary/20"
                            />
                        </div>

                        <div className='space-y-2'>
                            <Label className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Password</Label>
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="Create a strong password"
                                required
                                className="h-11 rounded-xl bg-background/50 border-border/80 focus:border-primary focus:ring-primary/20"
                            />
                        </div>

                        <div className='space-y-2 pt-1'>
                            <Label className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">I am a...</Label>
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

                        <div className='space-y-2 pt-1'>
                            <Label className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Profile Photo / Avatar</Label>
                            <div className='relative'>
                                <Input
                                    accept="image/*"
                                    type="file"
                                    onChange={changeFileHandler}
                                    className="h-11 rounded-xl bg-background/50 border-border/80 text-xs file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer pt-2"
                                />
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            disabled={loading}
                            className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white font-semibold shadow-md shadow-primary/20 transition-all mt-4"
                        >
                            {loading ? (
                                <span className='flex items-center gap-2'>
                                    <Loader2 className='h-5 w-5 animate-spin' /> Creating Account...
                                </span>
                            ) : "Sign Up"}
                        </Button>

                        <div className='text-center pt-2'>
                            <span className='text-sm text-muted-foreground'>
                                Already have an account? <Link to="/login" className='text-primary font-semibold hover:underline ml-1'>Sign in</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup