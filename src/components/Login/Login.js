import React, { useState, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
  // return new state which could be a object
};
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length>6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length>6};
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
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

  // useEffect(() => {
  //   console.log("checking validity");
  //   const identifier = setTimeout(() => {
  //     setFormIsValid(
  //       enteredEmail.includes("@") && enteredPassword.trim().length > 6
  //     );
  //   }, 500);
  //   return () => {
  //     console.log("CLEAN UP");
  //     clearTimeout(identifier);
  //   };
  //   // this is a clean up function we can return in use effect function , this will perform a clean up process before
  //   // this function executes for next time. It does not run before the very first side effect function run. it runs before every new
  //   //side effect function executes.
  // }, [enteredEmail, enteredPassword]);

  //debouncing:- we will not do our work work for every key stroke ..because in complex situation such as in sending http request
  //it can create network traffic and it is also possible that it sends too many unneccesary requests so debouncing is done .
  //we wait for some time when user's typing is complete and then we send request . this will work fine .
  // FOR EVERY KEYSTROKE WE ARE SETTING A TIMER

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    setFormIsValid(
      event.target.value.includes("@") && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
   // setEnteredPassword(event.target.value);
   dispatchPassword({type: "USER_INPUT", val: event.target.value})
    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    //setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    //setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type: "INPUT_BLUR"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
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
