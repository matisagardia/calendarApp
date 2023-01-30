import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useForm } from '../../hooks/useForm';
import { onLogin } from '../../store/auth/authSlice';
import './LoginPage.css';

const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
}

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: ''
}

export const LoginPage = () => {

    const {startLogin, startRegister, errorMessage} = useAuthStore();

    const {loginEmail, loginPassword, onInputChange:onLoginInputChange} = useForm(loginFormFields);
    const {registerName, registerEmail, registerPassword, registerPassword2, onInputChange:onRegisterInputChange} = useForm(registerFormFields);

    const loginSubmit = (e) => {
        e.preventDefault();
        startLogin({email: loginEmail, password: loginPassword});
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        if ( registerPassword !== registerPassword2 ) {
            Swal.fire('Register error', 'Passwords does not match', 'error');
            return;
        }
        startRegister({name: registerName, email: registerEmail, password: registerPassword, password2: registerPassword2})
    }
    

    useEffect(() => {
      if ( errorMessage !== undefined ) {
        Swal.fire('Authentication Error', errorMessage, 'error');
      }
    }, [errorMessage])
    

  return (
      <div className="container login-container">
          <div className="row">
              <div className="col-md-6 login-form-1">
                  <h3>Login</h3>
                  <form onSubmit={loginSubmit}>
                      <div className="form-group mb-2">
                          <input 
                              type="text"
                              className="form-control"
                              placeholder="Email"
                              name='loginEmail'
                              value={loginEmail}
                              onChange={onLoginInputChange}
                          />
                      </div>
                      <div className="form-group mb-2">
                          <input
                              type="password"
                              className="form-control"
                              placeholder="Password"
                              name='loginPassword'
                              value={loginPassword}
                              onChange={onLoginInputChange}
                          />
                      </div>
                      <div className="form-group mb-2 mt-3">
                          <input 
                              type="submit"
                              className="btnSubmit"
                              value="Login" 
                          />
                      </div>
                  </form>
              </div>

              <div className="col-md-6 login-form-2">
                  <h3>Register</h3>
                  <form onSubmit={registerSubmit}>
                      <div className="form-group mb-2">
                          <input
                              type="text"
                              className="form-control"
                              placeholder="Name"
                              name='registerName'
                              value={registerName}
                              onChange={onRegisterInputChange}
                          />
                      </div>
                      <div className="form-group mb-2">
                          <input
                              type="email"
                              className="form-control"
                              placeholder="Email"
                              name='registerEmail'
                              value={registerEmail}
                              onChange={onRegisterInputChange}
                          />
                      </div>
                      <div className="form-group mb-2">
                          <input
                              type="password"
                              className="form-control"
                              placeholder="Password" 
                              name='registerPassword'
                              value={registerPassword}
                              onChange={onRegisterInputChange}
                          />
                      </div>

                      <div className="form-group mb-2">
                          <input
                              type="password"
                              className="form-control"
                              placeholder="Repeat your password" 
                              name='registerPassword2'
                              value={registerPassword2}
                              onChange={onRegisterInputChange}
                          />
                      </div>

                      <div className="form-group mb-2 mt-3">
                          <input 
                              type="submit" 
                              className="btnSubmit" 
                              value="Create Account" />
                      </div>
                  </form>
              </div>
          </div>
      </div>
  )
}