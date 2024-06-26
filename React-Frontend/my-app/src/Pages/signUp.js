
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createUser, findUser, setUser } from "../data/repo";

export default function SignUp(props) {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    username: "", email: "", firstname: "", lastname: "", password: "", confirmPassword: "", DateOfBirth: "", isBlocked: false
  });
  const [errors, setErrors] = useState({ });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFields({ 
      ...fields, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { isValid } = await handleValidation();
    if(!isValid) return;

    const user = await createUser(fields);

    setUser(user);
    props.loginUser(user);

    navigate("/");
  };

  const isStrongPassword = (password) => {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})");
    return strongRegex.test(password);
  };

  const handleValidation = async () => {
    const currentErrors = { };

    let key = "username";
    let field = fields[key];
    if(field.length === 0)
      currentErrors[key] = "Username is required.";
    else if(field.length > 32)
      currentErrors[key] = "Username length cannot be greater than 32.";
    else if(await findUser(fields.username) !== null)
      currentErrors[key] = "Username is already registered.";

    key = "firstname";
    field = fields[key];
    if(field.length === 0)
      currentErrors[key] = "First name is required.";
    else if(field.length > 40)
      currentErrors[key] = "First name length cannot be greater than 40.";

    key = "lastname";
    field = fields[key];
    if(field.length === 0)
      currentErrors[key] = "Last name is required.";
    else if(field.length > 40)
      currentErrors[key] = "Last name length cannot be greater than 40.";

    key = "password";
    field = fields[key];
    if(field.length === 0)
      currentErrors[key] = "Password is required.";
    else if(field.length < 6)
      currentErrors[key] = "Password must contain at least 6 characters.";
    else if (!isStrongPassword(field))
      currentErrors[key] = "Please Use A Strong Password"

    key = "confirmPassword";
    field = fields[key];
    if(field !== fields.password)
      currentErrors[key] = "Passwords do not match.";

    key = "DateOfBirth";
    field = fields[key];
    if (!field)
      currentErrors[key] = "Date of Birth is required.";
    
    key = "email";
    field = fields[key];
    if (field.length === 0) currentErrors[key] = "Email is required.";

    setErrors(currentErrors);

    return { isValid: Object.keys(currentErrors).length === 0 };
  };

  return (
    <div>
      <h1>Register</h1>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="control-label">Username</label>
              <input name="username" id="username" className="form-control"
                value={fields.username} onChange={handleInputChange} />
              {errors.username && <div className="text-danger">{errors.username}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="email" className="control-label">Email</label>
              <input name="email" id="email" className="form-control"
                value={fields.email} onChange={handleInputChange} />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="firstname" className="control-label">First name</label>
              <input name="firstname" id="firstname" className="form-control"
                value={fields.firstname} onChange={handleInputChange} />
              {errors.firstname && <div className="text-danger">{errors.firstname}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="lastname" className="control-label">Last name</label>
              <input name="lastname" id="lastname" className="form-control"
                value={fields.lastname} onChange={handleInputChange} />
              {errors.lastname && <div className="text-danger">{errors.lastname}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="DateOfBirth" className="control-label">Date of Birth</label>
              <input type="date" name="DateOfBirth" id="DateOfBirth" className="form-control"
                value={fields.DateOfBirth} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="control-label">
                Password <small className="text-muted">must be at least 6 characters</small>
              </label>
              <input type="password" name="password" id="password" className="form-control"
                value={fields.password} onChange={handleInputChange} />
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="control-label">Confirm password</label>
              <input type="password" name="confirmPassword" id="confirmPassword" className="form-control"
                value={fields.confirmPassword} onChange={handleInputChange} />
              {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
            </div>
            
            <div className="form-group">
              <input type="submit" className="btn btn-primary mr-5" value="Register" />
              <Link className="btn btn-outline-dark" to="/">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
