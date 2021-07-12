import React, { useState } from "react";


const SearchForm = ({ searchFor }) => {
    console.debug("SearchForm", "searchFor=", typeof searchFor);

    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        searchFor(searchTerm.trim() || undefined);
        setSearchTerm(searchTerm.trim());
    }

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

    return (
        <div className="SearchForm mb-4">
            <form className="form-inline" onSubmit={handleSubmit}>
                <input
                    className="form-control form-control-md"
                    name="searchTerm"
                    placeholder="Enter search term..."
                    value={searchTerm}
                    onChange={handleChange}
                />

                <button type="submit" className="btn btn-primary btn-md">
                    Search
                </button>
            </form>
        </div >
    )
}

export default SearchForm;