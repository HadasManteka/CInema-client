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
import axios from "axios";

const Register = () => {
  const {createUser, setAdmin} = useContext(AuthContext);
  const history = useHistory();

  const [values, setValues] = useState({
    password: "",
    email:"",
    name:"",
    validMessage:"",
    showPassword: false,
  });

  const navigateHome = () => {
    history.push("/");
  };

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

  const validation = () => {
    let valid = true;  
    let message = "";

    let emailValid = values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      if(!emailValid) {
         message= 'email is invalid';
         valid = false;
      }

      let passwordValid = values.password.length >= 6;
      if(!passwordValid) {
        message = 'password must be least 6 chars';
        valid = false;
      }
      
      let nameValid = values.name != "";
      if(!nameValid) {
        message = 'name is required';
        valid = false;
      }

      setValues({
        ...values,
        validMessage: message,
      });

      return valid;
  }

  const handleSubmit = event =>{
      event.preventDefault();

      if (validation()) {

        axios.get("http://localhost:4000/doesEmailExists/" + values.email).then(isExists=>{
          
        if (isExists.data) {
          setValues({
            ...values,
            validMessage: "Email already exists",
          });
        } else {
          createUser(values.email, values.password)
            .then(result =>{
              createUserDB(values.name, values.name, values.email, false).then(res=> {
                setAdmin(res.data[0]?.is_admin);
              })
            })
            .catch(error =>{
              console.log(error);
            })
          }
      });
        
      }
    }

  const createUserDB = (first_name, last_name, email, is_admin) => {
    axios.post("http://localhost:4000/createUser",{user: {first_name, last_name, email, is_admin}})
    .then(res => {
      console.log(res);
      values.email = "";
      values.password="";
      navigateHome();
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
                <div className="or__line">
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
                  <div style={{color:"red"}}>
                  {values.validMessage}
                    </div>
                  <button type="submit" onClick={handleSubmit}>Register here</button>
                  <div className="register_btn" onClick={navigateLogin}>
                    Already have an Account? <b>Login</b>
                  </div>
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