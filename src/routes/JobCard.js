import React, { useState, useContext } from "react";
import UserContext from "../UserContext";
import "./JobCard.css";


/** View details of this job */

const JobCard = ({ id, title, salary, equity, companyName }) => {
    console.debug("JobCard");

    const [applied, setApplied] = useState();

    const { hasAlreadyApplied, applyToJob } = useContext(UserContext);

    React.useEffect(function updateAppliedStatus() {
        console.debug("JobCard useEffect updateAppliedStatus", "id=", id);

        setApplied(hasAlreadyApplied(id));
    }, [id, hasAlreadyApplied]);

    async function handleApply(e) {
        if (hasAlreadyApplied(id)) return;
        applyToJob(id);
        setApplied(true);
    }

    return (
        <div className="JobCard card"> {applied}
            <div className="card-body">
                <h4 className="card-title">{title}</h4>
                <p>{companyName}</p>
                {salary &&
                    <div>
                        Salary: {salary}
                    </div>
                }
                {equity &&
                    <div>
                        Equity: {equity}
                    </div>
                }
                <button className="btn btn-success text-uppercase float-end" onClick={handleApply}>
                    {applied ? "Applied" : "Apply"}
                </button>
            </div>
        </div>
    )
}

export default JobCard;