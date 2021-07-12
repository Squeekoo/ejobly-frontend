import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../Alert";

const SignupForm = ({ signup }) => {
    const history = useHistory();
    const initialState = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    };

    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState([]);

    console.debug(
        "SignupForm",
        "signup=", typeof signup,
        "formData=", formData,
        "formErrors=", formErrors,
    )

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let result = await signup(formData);
        if (result.success) {
            history.push("/companies");
        } else {
            setFormErrors(result.err);
        }
    }

    return (
        <div className="SignupForm">
            <div className="container col-md-6 col-lg-4">
                <h1>Sign Up</h1>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    onChange={handleChange}
                                    name="username"
                                    value={formData.username}
                                    className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>First name</label>
                                <input
                                    onChange={handleChange}
                                    name="firstName"
                                    value={formData.firstName}
                                    className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Last name</label>
                                <input
                                    onChange={handleChange}
                                    name="lastName"
                                    value={formData.lastName}
                                    className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    onChange={handleChange}
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    className="form-control" />
                            </div>

                            {formErrors.length
                                ? <Alert type="danger" messages={formErrors} />
                                : null
                            }

                            <button type="submit" className="btn btn-primary float-end" onSubmit={handleSubmit}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupForm;