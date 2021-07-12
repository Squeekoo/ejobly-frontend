import React, { useState, useContext } from "react";
import JoblyApi from "../Api";
import UserContext from "../UserContext";
import Alert from "../Alert";
import "./ProfileForm.css";

const ProfileForm = () => {
    const { currUser, setCurrUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        username: currUser.username,
        firstName: currUser.firstName,
        lastName: currUser.lastName,
        email: currUser.email,
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);
    const [saved, setSaved] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({
            ...data,
            [name]: value,
        }));
        setFormErrors([]);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        let profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
        };

        let username = formData.username;
        let updatedUser;

        try {
            updatedUser = await JoblyApi.saveCurrUser(username, profileData);
        } catch (err) {
            setFormErrors(err);
            return;
        }

        setFormData(data => ({
            ...data, password: ""
        }));
        setFormErrors([]);
        setSaved(true);
        setCurrUser(updatedUser);
    }

    return (
        <div className="ProfileForm">
            <div className="container col-md-6 col-lg-4">
                <h1>Profile</h1>
                <div className="card">
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label>Username</label>
                                <p className="form-control-plaintext">{formData.username}</p>
                            </div>
                            <div className="form-group">
                                <label>First Name</label>
                                <input
                                    className="form-control"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input
                                    className="form-control"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm password to make changes:</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            {formErrors.length
                                ? <Alert type="danger" messages={formErrors} />
                                : null
                            }

                            {saved
                                ? <Alert type="success" messages={["Update saved!"]} />
                                : null
                            }

                            <button className="btn btn-success float-end" onClick={handleSubmit}>
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileForm;