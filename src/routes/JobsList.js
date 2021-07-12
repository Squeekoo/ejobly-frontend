import React, { useEffect, useState } from "react";
import JoblyApi from "../Api";
import SearchForm from "../forms/SearchForm";
import JobCardList from "./JobCardList";

/** List all Jobs
* 
* Return Job Component
* 
*/

const JobsList = () => {
    console.debug("JobList");

    const [jobs, setJobs] = useState(null);

    useEffect(function getJobsOnMount() {
        console.debug("JobList useEffect getJobsOnMount");
        search();
    }, []);

    /** Triggered by search form submit; reloads companies. */
    async function search(name) {
        let jobs = await JoblyApi.getJobs(name);
        setJobs(jobs);
    }

    if (!jobs) return <h1>Loading...</h1>;

    return (
        <div className="JobsList col-md-8 offset-md-2">
            <SearchForm searchFor={search} />

            {jobs.length
                ? <JobCardList jobs={jobs} />
                : <h1 className="lead">Oops! Job not found!</h1>}
        </div>


    )
}

export default JobsList;