import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Form, ProgressBar } from 'react-bootstrap';
import HomePage from './pages/Home/HomePage';
import BasicQuiz from './pages/BasicQuiz/BasicQuiz';
import DetailedQuiz from './pages/DetailedQuiz/DetailedQuiz';

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}



function App() {
  const [key, setKey] = useState<string>(keyData); //for api key input
  const [page, setPage] = useState<string>("HomePage");
  
  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  return (
    <div className="App">
      <div className="MainWrapper">
        <div className="MainContent">
          <header className="App-header">
            <div className="HeaderContent">
              <div>
                {page !== "HomePage" && (
                <Button className="return-button" onClick={()=> setPage("HomePage")}>Home</Button>
                )}
              </div>
              <div className="HeaderTitle">
                The Career Helpi
              </div>
              <div className="LoginButtons">
                <Button>Sign Up</Button>
                <Button>Login</Button>
              </div>
            </div>
          </header>
          {page === "HomePage" && <HomePage setPage={setPage}/>}
          {page === "BasicQuiz" && <BasicQuiz setPage={setPage}/>}
          {page === "DetailedQuiz" && <DetailedQuiz setPage={setPage}/>}
        </div>
        <footer className="footer">
          <p>Icon will go here</p>
        </footer>
      </div>
      <div className="api-form-container">
        <Form className="api-form">
          <Form.Label>API Key:</Form.Label>
          <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
          <br></br>
          <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
