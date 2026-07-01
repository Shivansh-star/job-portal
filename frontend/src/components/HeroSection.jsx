import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, Sparkles, TrendingUp } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const popularSearches = [
    "Frontend Developer",
    "Backend Engineer",
    "Product Manager",
    "Data Scientist",
    "UI/UX Designer"
];

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (searchQuery = query) => {
        if (!searchQuery.trim()) return;
        dispatch(setSearchedQuery(searchQuery));
        navigate("/browse");
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchJobHandler();
        }
    }

    return (
        <div className='relative overflow-hidden pt-12 pb-20 md:py-28'>
            {/* Subtle background glow blobs */}
            <div className='absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-primary/20 via-indigo-500/10 to-transparent blur-[120px] -z-10 rounded-full pointer-events-none' />
            <div className='absolute bottom-10 right-10 w-[300px] h-[300px] bg-purple-500/10 blur-[100px] -z-10 rounded-full pointer-events-none' />

            <div className='text-center max-w-4xl mx-auto px-4'>
                <div className='flex flex-col items-center gap-6'>
                    <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wide uppercase shadow-sm hover:scale-105 transition-transform cursor-default'>
                        <Sparkles className='w-3.5 h-3.5 animate-pulse' />
                        <span>No. 1 Job Hunt Platform</span>
                    </div>

                    <h1 className='text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.15] text-foreground'>
                        Discover Opportunities <br className='hidden sm:inline' />
                        That Elevate Your <span className='bg-gradient-to-r from-primary via-indigo-500 to-purple-600 bg-clip-text text-transparent'>Career</span>
                    </h1>

                    <p className='text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed'>
                        Your next great career move starts here. Connect with top tech giants and innovative startups to find the role you've always dreamed of.
                    </p>

                    {/* Elevated Search Bar */}
                    <div className='w-full sm:w-[85%] md:w-[75%] mt-4 bg-card/90 backdrop-blur-xl shadow-2xl shadow-primary/10 border border-border/80 p-2 rounded-full flex items-center gap-3 mx-auto hover:border-primary/40 focus-within:ring-4 focus-within:ring-primary/15 focus-within:border-primary transition-all duration-300'>
                        <div className='pl-4 text-muted-foreground'>
                            <Search className='h-5 w-5' />
                        </div>
                        <input
                            type="text"
                            placeholder='Job title, keyword, or company...'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyPress}
                            className='outline-none border-none w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm sm:text-base font-medium'
                        />
                        <Button 
                            onClick={() => searchJobHandler()} 
                            className="rounded-full h-12 px-8 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white font-semibold shadow-md shadow-primary/20 transition-all duration-200 shrink-0"
                        >
                            Search
                        </Button>
                    </div>

                    {/* Popular Searches Pills */}
                    <div className='flex flex-wrap items-center justify-center gap-2 mt-4 text-xs sm:text-sm text-muted-foreground'>
                        <span className='flex items-center gap-1 font-medium text-foreground mr-1'>
                            <TrendingUp className='w-3.5 h-3.5 text-primary' /> Popular:
                        </span>
                        {popularSearches.map((tag, idx) => (
                            <button
                                key={idx}
                                onClick={() => searchJobHandler(tag)}
                                className='px-3 py-1 rounded-full bg-accent/60 hover:bg-primary/15 hover:text-primary border border-transparent hover:border-primary/20 transition-all duration-200 font-medium'
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection