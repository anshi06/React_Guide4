import React, { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  //Step 1:
  // useEffect(()=>{
  //   console.log('Effect Running');
  // })

  // //Step 2:
  // useEffect(()=>{
  //   console.log('Effect Running');
  // }, [])


  //Step 3:
  // useEffect(()=>{
  //   console.log('Effect Running');
  // }, [enteredPassword])

  //Step 4:
  // useEffect(()=>{
  //   console.log('Effect Running');
  //   return ()=>{console.log('Effect Clean UP')}
  // }, [enteredPassword])


  //Step 5:
  // useEffect(()=>{
  //   console.log('Effect Running');
  //   return ()=>{console.log('Effect Clean UP')}
  // }, [])


  useEffect(() => {
    console.log("checking validity");
    const identifier = setTimeout(() => {
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 500);
    return () => {
      console.log("CLEAN UP");
      clearTimeout(identifier);
    };
    // this is a clean up function we can return in use effect function , this will perform a clean up process before
    // this function executes for next time. It does not run before the very first side effect function run. it runs before every new
    //side effect function executes.
  }, [enteredEmail, enteredPassword]);

  //debouncing:- we will not do our work work for every key stroke ..because in complex situation such as in sending http request
  //it can create network traffic and it is also possible that it sends too many unneccesary requests so debouncing is done .
  //we wait for some time when user's typing is complete and then we send request . this will work fine .
  // FOR EVERY KEYSTROKE WE ARE SETTING A TIMER

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
