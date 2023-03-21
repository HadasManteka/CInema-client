import "./Login.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import React, { useState, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AuthContext } from '../../context/UserContext';
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [values, setValues] = useState({
    password: "",
    email:"",
    validMessage:"",
    showPassword: false,
  });

  const history = useHistory();
  const {signIn, setAdmin} = useContext(AuthContext);
  
  const navigateHome = () => {
    history.push("/");
  };

  const navigateRegister = () => {
    history.push("/register");
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

      signIn(values.email, values.password)
      .then(result =>{
        const user = result.user;
        console.log(user);
        

        axios.get("http://localhost:4000/getUserByEmail/" + values.email).then(res => {
          setAdmin(res.data[0]?.is_admin);
          values.email = "";
          values.password="";
          navigateHome();
        })
      })
      .catch(error => {
        setValues({
          ...values,
          validMessage: "wrong credentials",
        });
      })
    }
  return (
    <>
      <div className="login__main">
        <div className="login__row row ">
          <div className="login__right card">
            <div className="form__login">
              <div className="login__title">
                <h2>Connect to your account</h2>
              </div>
              <div className="login__btns">
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
                  <button type="submit" onClick={handleSubmit}>Login here</button>
                  <div className="register_btn" onClick={navigateRegister}>
                    Dont have an Account? <b>Register</b>
                  </div>
                  <div className="register_btn" onClick={navigateHome}>
                   Continue without login
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

export default Login;
