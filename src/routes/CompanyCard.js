import React from "react";
import { Link } from "react-router-dom";
import "./CompanyCard.css";

/** View details of this company */

const CompanyCard = ({ name, handle, description, logoUrl }) => {
    console.debug("CompanyCard", logoUrl);

    return (
        <div>
            <Link className="CompanyCard card" to={`/companies/${handle}`}>
                <div className="card-body">
                    <h4 className="card-title text-dark">
                        {name}
                        {logoUrl &&
                            <img src={logoUrl} alt="Logo" className="ml-5 float-end" />}
                    </h4>
                    <p className="text-dark">{description}</p>
                </div>
            </Link>
        </div>
    )
}

export default CompanyCard;