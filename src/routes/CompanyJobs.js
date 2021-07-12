import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../Api";
import JobCardList from "./JobCardList";

/** Lists Jobs within given Company */

const CompanyJobs = () => {
    const { handle } = useParams();
    console.debug("CompanyDetail", "handle=", handle);

    const [company, setCompany] = useState(null);

    useEffect(function getCompanyJobs() {
        async function getCompany() {
            setCompany(await JoblyApi.getCompany(handle));
        }
        getCompany();
    }, [handle]);

    if (!company) return <h1>Loading...</h1>

    return (
        <div className="CompanyJobs col-md-8 offset-md-2">
            <h1>{company.name}</h1>
            <p>{company.description}</p>
            <JobCardList jobs={company.jobs} />
        </div>
    )
}

export default CompanyJobs;