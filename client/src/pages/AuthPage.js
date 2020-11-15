import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { isLoading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    email:'',
    password: ''
  });

  useEffect(()=> {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(()=> {
    window.M.updateTextFields();
  }, [])

  const changeHangler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      message(data.message);
    } catch (e) {

    }
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });

      auth.login(data.token, data.userId);
    } catch (e) {

    }
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Short Link</h1>
        <div className="card darken-1">
          <div className="card-content">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Enter email"
                  id="email"
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={changeHangler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Enter password"
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={changeHangler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn orange darken-3 waves-effect waves-light m1 btn-login"
              type="button"
              disabled={isLoading}
              onClick={loginHandler}
            >Sign in</button>
            <button
              className="btn grey waves-effect waves-light"
              type="button"
              onClick={registerHandler}
              disabled={isLoading}
            >Sign up</button>
          </div>
        </div>
      </div>
    </div>
  )
};
