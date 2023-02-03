import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/UserContext';
import './Register.css';
import TextField from "@mui/material/TextField";
import GoogleIcon from "../../../images/google.svg";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useHistory } from "react-router-dom";

const Register = () => {
  const {createUser, signInWithGoogle} = useContext(AuthContext);
  const history = useHistory();

  const [values, setValues] = useState({
    password: "",
    email:"",
    name:"",
    showPassword: false,
  });

  const navigateLogin = () => {
    history.push("/login");
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

    const handleSubmit = event =>{
        event.preventDefault();

        // const form = event.target;
        // const name = form.name.value;
        // const email = form.email.value;
        // const password = form.password.value;
        // console.log(name, email, password);

        createUser(values.email, values.password)
        .then(result =>{
          const user = result.user;
          console.log('registered user', user);
          values.email = "";
          values.password="";
          navigateLogin();
          // TODO CREATE USER IN THE DB WHEN CREATING
        })
        .catch(error =>{
          console.error(error)
        })
    }

    return (
      <>
      <div className="login__main">
        <div className="login__row row ">
          <div className="login__right card">
            <div className="form__login">
              <div className="login__title">
                <h2>Register to the best cinema</h2>
              </div>
              <div className="login__btns">
                <div className="google__login">
                  <button className="google">
                    <img src={GoogleIcon} width="20" alt="" /> Continue with
                    Google
                  </button>
                </div>
                <div className="or__line">
                  <p className="span-h"></p>
                  <p className="span-p"> or</p>
                  <p className="span-k"></p>
                </div>
                <Box
                  component="form"
                  noValidate
                  sx={{
                    "& .MuiInputBase-input": {
                      m: 1,
                      height: "4ch",
                      width: "35ch",
                    },
                    "& > :not(style)": { m: 1, width: "35ch" },
                    "& .MuiButtonBase-root": {
                      display: "flex",
                      justifyContent: "flex-end",
                      paddingX: "10px",
                      width: "30px",
                    },
                    "& .MuiInputBase-input::after": {
                      color: "red",
                      borderBottom: "2px solid red",

                      "&focus": {
                        color: "pink",
                        borderBottom: "2px solid red",
                      },
                    },
                  }}
                  className="input_all"
                  autoComplete="off"
                >
                  <div className="sign_name">
                    <h5>Username</h5>
                    <TextField
                      sx={{}}
                      fullWidth
                      id="standard-basic"
                      className=""
                      variant="filled"
                      focused
                      size="small"
                      onChange={handleChange("name")}
                    />
                  </div>
                  <div className="sign_name">
                    <h5>Email</h5>
                    <TextField
                      sx={{}}
                      fullWidth
                      id="standard-basic"
                      className=""
                      variant="filled"
                      focused
                      size="small"
                      onChange={handleChange("email")}
                    />
                  </div>
                  <div className="sign_pass">
                    <h5>Password</h5>

                    <FormControl variant="filled" size="small" fullWidth>
                      <FilledInput
                        id="filled-adornment-password"
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange("password")}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </div>
                </Box>
                <div className="new__acc">
                  <button type="submit" onClick={handleSubmit}>Register here</button>
                  {/* <div className="register_btn" onClick={navigateRegister}>
                    Dont have an Account? <b>Register</b>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    );
};

export default Register;