import React from 'react';

import { useFormValidation } from './useFormValidation';
import { validateLogin } from './validateLogin';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: ''
};

function Login(props) {
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    values
  } = useFormValidation(INITIAL_STATE, validateLogin);
  const [login, setLogin] = React.useState(true);

  return (
    <div>
      {/* Title */}
      <h2 className="mv3">{login ? 'Login' : 'Create Account'}</h2>
      {/* Form */}
      <form className="flex flex-column" onSubmit={handleSubmit}>
        {/* Name */}
        {!login && (
          <input
            autoComplete="off"
            name="name"
            onChange={handleChange}
            placeholder="Your Name"
            type="text"
            value={values.name}
          />
        )}
        {/* Email */}
        <input
          autoComplete="off"
          className={errors.email && 'error-input'}
          name="email"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Your Email"
          type="email"
          value={values.email}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        {/* Password */}
        <input
          autoComplete="off"
          className={errors.password && 'error-input'}
          name="password"
          onChange={handleChange}
          placeholder="Password"
          type="password"
          value={values.password}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        {/* Controls */}
        <div className="flex mt3">
          {/* Submit */}
          <button
            className="button pointer mr2"
            disabled={isSubmitting}
            style={{ background: isSubmitting ? 'grey' : 'orange' }}
            type="submit"
          >
            submit
          </button>
          {/* Create account / login */}
          <button
            className="button pointer"
            type="button"
            onClick={() => setLogin((prevLogin) => !prevLogin)}
          >
            {login ? 'need to create an account?' : 'already have an account?'}
          </button>
        </div>
      </form>
    </div>
  );
}

export { Login };
