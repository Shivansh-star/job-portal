import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Bookmark, ArrowUpRight } from 'lucide-react'

const SavedJobsTable = () => {
    const { allJobs = [] } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    const savedJobs = allJobs.filter(job => user?.profile?.savedJobs?.includes(job._id));

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableCaption className="text-xs text-muted-foreground pt-4">A list of jobs you have bookmarked for later</TableCaption>
                <TableHeader>
                    <TableRow className="border-border/60 hover:bg-transparent">
                        <TableHead className="font-semibold text-foreground">Date Posted</TableHead>
                        <TableHead className="font-semibold text-foreground">Job Role</TableHead>
                        <TableHead className="font-semibold text-foreground">Company</TableHead>
                        <TableHead className="text-right font-semibold text-foreground">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {savedJobs.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-8 text-muted-foreground font-medium">
                                <div className="flex flex-col items-center gap-2">
                                    <Bookmark className="w-6 h-6 text-muted-foreground/50" />
                                    <span>You haven't bookmarked any opportunities yet.</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        savedJobs.map((job) => (
                            <TableRow key={job._id} className="border-border/40 hover:bg-accent/40 transition-colors">
                                <TableCell className="text-muted-foreground font-medium text-xs">
                                    {job?.createdAt?.split("T")[0] || "Recently"}
                                </TableCell>
                                <TableCell className="font-bold text-foreground">
                                    {job?.title}
                                </TableCell>
                                <TableCell className="font-medium text-foreground/80">
                                    {job?.company?.name || "Tech Company"}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button 
                                        onClick={() => navigate(`/description/${job._id}`)} 
                                        variant="outline" 
                                        size="sm"
                                        className="rounded-full px-4 h-8 text-xs font-semibold hover:bg-primary hover:text-white border-border/80 transition-all"
                                    >
                                        <span>View Details</span>
                                        <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default SavedJobsTable
