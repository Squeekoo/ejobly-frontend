import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../Alert";

const LoginForm = ({ login }) => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);

    console.debug(
        "LoginForm",
        "login=", typeof login,
        "formData=", formData,
        "formErrors=", formErrors,
    )

    async function handleSubmit(e) {
        e.preventDefault();
        let result = await login(formData);
        if (result.success) {
            history.push("/companies");
        } else {
            setFormErrors(result.err);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    }

    return (
        <div className="LoginForm">
            <div className="container col-md-6 col-lg-4">
                <h1>Log In</h1>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    name="username"
                                    value={formData.username}
                                    className="form-control"
                                    onChange={handleChange}
                                    autoComplete="username"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    name="password"
                                    value={formData.password}
                                    type="password"
                                    className="form-control"
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    required
                                />
                            </div>

                            {formErrors.length
                                ? <Alert type="danger" messages={formErrors} />
                                : null
                            }

                            <button className="btn btn-primary float-end" onSubmit={handleSubmit}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;