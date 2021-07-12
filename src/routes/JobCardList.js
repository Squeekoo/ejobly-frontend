import React from "react";
import JobCard from "./JobCard";

/** List job cards */

const JobCardList = ({ jobs }) => {
    console.debug("JobCardList", "jobs=", jobs);

    return (
        <div>
            {jobs.map(j => (
                <JobCard
                    id={j.id}
                    title={j.title}
                    salary={j.salary}
                    equity={j.equity}
                    companyName={j.companyName}
                    key={j.id} />
            ))}
        </div>
    )
}

export default JobCardList;