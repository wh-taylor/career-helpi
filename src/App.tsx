import React, { useState } from 'react';
import './App.css';
import { Button, Form} from 'react-bootstrap';
import HomePage from './pages/Home/HomePage';
import BasicQuiz from './pages/BasicQuiz/BasicQuiz';
import DetailedQuiz from './pages/DetailedQuiz/DetailedQuiz';
import ResultsPage from './pages/ResultsPage/ResultsPage';
import earthImg from './earth.png';

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
            <div className="HeaderSide left">
              <div className="home-container">
                {page !== "HomePage" && (
                  <Button className="home-button" onClick={() => setPage("HomePage")}>
                    <img src={earthImg} alt="Earth" className="earth-icon"/>
                    Home
                  </Button>
                )}
              </div>
            </div>

            <div className="HeaderCenter">
              <div className="HeaderTitle">The Career Cosmos</div>
            </div>

            <div className="HeaderSide right">{/* Optional right-side content */}</div>
          </div>
        </header>
          {page === "HomePage" && <HomePage setPage={setPage}/>}
          {page === "BasicQuiz" && <BasicQuiz setPage={setPage}/>}
          {page === "DetailedQuiz" && <DetailedQuiz setPage={setPage}/>}
          {page === "ResultsPage" && <ResultsPage setPage={setPage}/>}
        </div>
        <footer className="footer">
          {page === "HomePage" &&
            (<p>Scroll below to insert API key</p>)
          }
        </footer>
      </div>
      <div className="api-form-container">
        {page === "HomePage" &&
          (<Form className="api-form">
            <Form.Label>API Key:</Form.Label>
            <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
            <br></br>
            <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
          </Form>)
        }
      </div>
    </div>
  );
}

export default App;
