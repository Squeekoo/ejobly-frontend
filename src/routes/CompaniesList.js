import React, { useEffect, useState } from "react";
import JoblyApi from "../Api";
import CompanyCard from "./CompanyCard";
import SearchForm from "../forms/SearchForm";

/** List all companies
* 
* Return Company Component
* 
*/

const CompaniesList = () => {
    console.debug("CompanyList");

    const [companies, setCompanies] = useState(null);

    useEffect(function getCompaniesOnMount() {
        console.debug("CompanyList useEffect getCompaniesOnMount");
        search();
    }, []);

    /** Triggered by search form submit; reloads companies. */
    async function search(name) {
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies);
    }

    if (!companies) return <h1>Loading...</h1>;

    return (
        <div className="CompaniesList col-md-8 offset-md-2">
            <SearchForm searchFor={search} />

            {companies.length ? (
                <div className="CompaniesList-list">
                    {companies.map(c => (
                        <CompanyCard
                            key={c.handle}
                            name={c.name}
                            handle={c.handle}
                            description={c.description}
                            logoUrl={c.logoUrl} />
                    ))}
                </div>
            ) : (
                <h1 className="lead">Oops! Company not found!</h1>
            )}
        </div>
    );
}

export default CompaniesList;