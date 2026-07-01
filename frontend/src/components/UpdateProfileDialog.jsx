import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, Sparkles } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file: ""
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[480px] rounded-3xl p-6 sm:p-8 border border-border/80 bg-card shadow-2xl" onInteractOutside={() => setOpen(false)}>
                <DialogHeader className="space-y-2 pb-4 border-b border-border/40">
                    <div className='flex items-center gap-2 text-primary'>
                        <Sparkles className='w-5 h-5' />
                        <span className='font-semibold text-xs uppercase tracking-wider'>Profile Settings</span>
                    </div>
                    <DialogTitle className="text-2xl font-bold text-foreground">Update Profile</DialogTitle>
                </DialogHeader>
                
                <form onSubmit={submitHandler} className="space-y-4 pt-4">
                    <div className='space-y-1.5'>
                        <Label htmlFor="fullname" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name</Label>
                        <Input
                            id="fullname"
                            name="fullname"
                            type="text"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            className="h-11 rounded-xl bg-background/50 border-border/80 focus:border-primary"
                        />
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div className='space-y-1.5'>
                            <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className="h-11 rounded-xl bg-background/50 border-border/80 focus:border-primary"
                            />
                        </div>
                        <div className='space-y-1.5'>
                            <Label htmlFor="phoneNumber" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone Number</Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="text"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                className="h-11 rounded-xl bg-background/50 border-border/80 focus:border-primary"
                            />
                        </div>
                    </div>

                    <div className='space-y-1.5'>
                        <Label htmlFor="bio" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Bio / Professional Headline</Label>
                        <Input
                            id="bio"
                            name="bio"
                            type="text"
                            value={input.bio}
                            onChange={changeEventHandler}
                            placeholder="e.g. Senior Full Stack Engineer passionate about scalable web apps"
                            className="h-11 rounded-xl bg-background/50 border-border/80 focus:border-primary"
                        />
                    </div>

                    <div className='space-y-1.5'>
                        <Label htmlFor="skills" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Skills (Comma separated)</Label>
                        <Input
                            id="skills"
                            name="skills"
                            type="text"
                            value={input.skills}
                            onChange={changeEventHandler}
                            placeholder="React, Node.js, MongoDB, TypeScript"
                            className="h-11 rounded-xl bg-background/50 border-border/80 focus:border-primary"
                        />
                    </div>

                    <div className='space-y-1.5'>
                        <Label htmlFor="file" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Resume (PDF)</Label>
                        <Input
                            id="file"
                            name="file"
                            type="file"
                            accept="application/pdf"
                            onChange={fileChangeHandler}
                            className="h-11 rounded-xl bg-background/50 border-border/80 text-xs file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer pt-2"
                        />
                    </div>

                    <DialogFooter className="pt-4">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setOpen(false)}
                            className="rounded-xl h-11 px-5 font-medium border-border/80"
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={loading}
                            className="rounded-xl h-11 px-6 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white font-semibold shadow-md shadow-primary/20 transition-all"
                        >
                            {loading ? (
                                <span className='flex items-center gap-2'>
                                    <Loader2 className='h-4 w-4 animate-spin' /> Updating...
                                </span>
                            ) : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog