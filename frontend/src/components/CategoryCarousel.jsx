import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Code2, Database, Layout, Palette, Terminal, Cpu } from 'lucide-react';

const categories = [
    { name: "Frontend Developer", icon: <Layout className="w-4 h-4 text-primary" /> },
    { name: "Backend Developer", icon: <Database className="w-4 h-4 text-indigo-500" /> },
    { name: "Data Science", icon: <Cpu className="w-4 h-4 text-purple-500" /> },
    { name: "Graphic Designer", icon: <Palette className="w-4 h-4 text-pink-500" /> },
    { name: "FullStack Developer", icon: <Code2 className="w-4 h-4 text-blue-500" /> },
    { name: "DevOps Engineer", icon: <Terminal className="w-4 h-4 text-emerald-500" /> }
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="py-8 px-4">
            <div className="text-center mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Explore Opportunities by Role</p>
            </div>
            <Carousel className="w-full max-w-4xl mx-auto px-12">
                <CarouselContent className="-ml-2 md:-ml-4">
                    {categories.map((cat, index) => (
                        <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4">
                            <button 
                                onClick={() => searchJobHandler(cat.name)} 
                                className="w-full group p-4 rounded-2xl bg-card border border-border/60 hover:border-primary/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center gap-2 text-center"
                            >
                                <div className="h-10 w-10 rounded-xl bg-accent/60 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                                    {cat.icon}
                                </div>
                                <span className="font-semibold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                    {cat.name}
                                </span>
                            </button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4 bg-card hover:bg-primary hover:text-white border-border/80 shadow-md transition-colors" />
                <CarouselNext className="-right-4 bg-card hover:bg-primary hover:text-white border-border/80 shadow-md transition-colors" />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel