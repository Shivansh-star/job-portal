import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import { Briefcase } from 'lucide-react'

const AppliedJobTable = () => {
    const { allAppliedJobs = [] } = useSelector(store => store.job);

    const getStatusBadge = (status) => {
        const s = status?.toLowerCase() || 'pending';
        if (s === 'rejected') {
            return <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/15 border border-destructive/20 font-semibold px-2.5 py-0.5 rounded-full">REJECTED</Badge>
        }
        if (s === 'accepted' || s === 'selected' || s === 'hired') {
            return <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/15 border border-emerald-500/20 font-semibold px-2.5 py-0.5 rounded-full">SELECTED</Badge>
        }
        return <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/15 border border-amber-500/20 font-semibold px-2.5 py-0.5 rounded-full">PENDING</Badge>
    };

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableCaption className="text-xs text-muted-foreground pt-4">A complete log of applications submitted</TableCaption>
                <TableHeader>
                    <TableRow className="border-border/60 hover:bg-transparent">
                        <TableHead className="font-semibold text-foreground">Applied Date</TableHead>
                        <TableHead className="font-semibold text-foreground">Job Title</TableHead>
                        <TableHead className="font-semibold text-foreground">Company</TableHead>
                        <TableHead className="text-right font-semibold text-foreground">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-8 text-muted-foreground font-medium">
                                <div className="flex flex-col items-center gap-2">
                                    <Briefcase className="w-6 h-6 text-muted-foreground/50" />
                                    <span>You haven't applied to any job roles yet.</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id} className="border-border/40 hover:bg-accent/40 transition-colors">
                                <TableCell className="text-muted-foreground font-medium text-xs">
                                    {appliedJob?.createdAt?.split("T")[0] || "Recently"}
                                </TableCell>
                                <TableCell className="font-bold text-foreground">
                                    {appliedJob.job?.title || "Unknown Role"}
                                </TableCell>
                                <TableCell className="font-medium text-foreground/80">
                                    {appliedJob.job?.company?.name || "Tech Company"}
                                </TableCell>
                                <TableCell className="text-right">
                                    {getStatusBadge(appliedJob?.status)}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable