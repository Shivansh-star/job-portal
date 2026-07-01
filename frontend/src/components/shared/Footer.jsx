import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card/40 border-t border-border/60 backdrop-blur-md pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-border/40">
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-foreground">
                Next<span className="bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">Role</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discover your dream career opportunity. Connecting top talent with world-class companies seamlessly.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground text-sm tracking-wide uppercase mb-4">For Candidates</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/jobs" className="hover:text-primary transition-colors">Browse Jobs</Link></li>
              <li><Link to="/browse" className="hover:text-primary transition-colors">Explore Categories</Link></li>
              <li><Link to="/profile" className="hover:text-primary transition-colors">Candidate Dashboard</Link></li>
              <li><Link to="/profile" className="hover:text-primary transition-colors">Saved Opportunities</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground text-sm tracking-wide uppercase mb-4">For Employers</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/login" className="hover:text-primary transition-colors">Post a Job</Link></li>
              <li><Link to="/admin/companies" className="hover:text-primary transition-colors">Company Setup</Link></li>
              <li><Link to="/admin/jobs" className="hover:text-primary transition-colors">Recruitment Suite</Link></li>
              <li><span className="cursor-pointer hover:text-primary transition-colors">Talent Solutions</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground text-sm tracking-wide uppercase mb-4">Connect With Us</h4>
            <p className="text-sm text-muted-foreground mb-4">Join our community for daily job tips and tech industry updates.</p>
            <div className="flex space-x-3">
              <a href="#" className="h-9 w-9 rounded-full bg-accent/60 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300 shadow-sm" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-accent/60 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300 shadow-sm" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-accent/60 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300 shadow-sm" aria-label="Github">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>© {new Date().getFullYear()} NextRole Inc. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;