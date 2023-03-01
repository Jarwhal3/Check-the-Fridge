﻿import React, { useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
} from 'reactstrap';
import './LoginPage.css';
import ReactDOM from 'react-dom';

export default function LoginPage({ userToken }) {
  //Variables
  const [userID, setUserID] = useState(0);
  const [first, setFirst] = useState();
  const [last, setLast] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [toggle, setToggle] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // Function to check if username and password match in database. Returns response to token
  async function login(uname, pass) {
    if (uname === ' ' && pass === ' ') userToken(1);
    else {
      await fetch('ApplicationUser/Login/' + uname + '/' + pass, {
        method: 'POST',
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          userToken(0);
          throw new Error('Something went wrong');
        })
        .then((responseJson) => {
          setUserID(responseJson);
          console.log(responseJson);
          userToken(responseJson);
          return responseJson;
        })
        .catch((error) => {
          console.log(error);
          setLoginError('true');
        });
    }
  }
  // Function to add a user to the database
  async function createUser(fname, lname, uname, pass) {
    await fetch(
      'ApplicationUser/Register/' +
        fname +
        '/' +
        lname +
        '/' +
        uname +
        '/' +
        pass,
      { method: 'POST' }
    )
      .then((response) => {
        if (response.ok) {
          console.log(response);
          userToken(response);
        }
        throw new Error('Not created');
      })

      .catch((error) => {
        console.log(error);
      });
  }

  // Function to send username and password to be verified.Expects user token.
  function handleLogin(event) {
    login(username, password);
    event.preventDefault();
    // Logic to be added for giving access or setting invalid message
  }

  /*Function that sends new user info to Backend to be added to database
    Re-routes to login page */
  function handleCreate(event) {
    createUser(first, last, username, password);
    event.preventDefault();
  }

  /* Shows default login page/ sign up page */
  return (
    <>
      <h2 style={{ textAlign: 'center' }}> Check The Fridge </h2>
      <div
        className='border rounded m-5'
        style={{ backgroundColor: '#E9EBF8' }}
      >
        {toggle ? (
          <form className='create-form'>
            <FormGroup>
              <Label for='fname'>First Name:</Label>
              <Input
                id='fname'
                name='fname'
                type='text'
                onChange={(e) => setFirst(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for='lname'>Last Name:</Label>
              <Input
                id='lname'
                name='lname'
                type='text'
                onChange={(e) => setLast(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for='username'>Username:</Label>
              <Input
                id='username'
                name='username'
                type='text'
                autoComplete='off'
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for='password'>Password:</Label>
              <Input
                id='password'
                name='password'
                type='password'
                autoComplete='off'
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <Row className='d-flex justify-content-center'>
              <Button
                className='w-25'
                type='submit'
                onClick={(event) => handleCreate(event)}
              >
                Create
              </Button>
              <Button
                outline
                style={{ color: '#2F4858' }}
                onClick={() => setToggle(false)}
              >
                Already have an account?
              </Button>
            </Row>
          </form>
        ) : (
          <Form className='login-form'>
            <FormGroup>
              <Label for='username'>Username:</Label>
              <Input
                id='username'
                name='username'
                type='text'
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for='password'>Password:</Label>
              <Input
                id='password'
                name='password'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <Row className='d-flex justify-content-center'>
              <Col>
                <Button
                  style={{ width: '100%' }}
                  onClick={() => setToggle(true)}
                >
                  Create Account
                </Button>
              </Col>
              <Col>
                <Button
                  style={{ width: '100%' }}
                  type='submit'
                  onClick={(event) => handleLogin(event)}
                >
                  Login
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </div>
    </>
  );
  /* Shows default login page/ sign up page */
  return (
    <div className='Auth-Page'>
      {toggle ? (
        <form className='create-form' onSubmit={(event) => handleCreate(event)}>
          <h2> Check The Fridge </h2>
          <div className='input'>
            <label>
              <p>First Name:</p>
              <input type='text' onChange={(e) => setFirst(e.target.value)} />
            </label>
          </div>
          <div className='input'>
            <label>
              <p>Last Name:</p>
              <input type='text' onChange={(e) => setLast(e.target.value)} />
            </label>
          </div>
          <div className='input'>
            <label>
              <p>Username:</p>
              <input
                type='text'
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div className='input'>
            <label>
              <p>Password:</p>
              <input
                type='password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className='submit'>
            <button type='submit'>Create</button>
          </div>
        </form>
      ) : (
        <form className='login-form' onSubmit={(event) => handleLogin(event)}>
          <h2> Check The Fridge </h2>
          <div className='input'>
            <label>
              <p>Username</p>
              <input
                type='text'
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div className='input'>
            <label>
              <p>Password</p>
              <input
                type='password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          <div className='submit'>
            <button onClick={() => setToggle(true)}> Create Account</button>
            <button type='submit'>Submit</button>
          </div>
        </form>
      )}
      {loginError == 'true' ? (
        <div className='login-error'>Invalid username or password </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
