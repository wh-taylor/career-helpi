import React, { useEffect, useState } from 'react';
import './App.css';
import { Button, Form} from 'react-bootstrap';
import HomePage from './pages/Home/HomePage';
import BasicQuiz from './pages/BasicQuiz/BasicQuiz';
import DetailedQuiz from './pages/DetailedQuiz/DetailedQuiz';
import ResultsPage from './pages/ResultsPage/ResultsPage';
import earthImg from './earth.png';
import starImg from './star.png';
import rocketImg from './pages/rocket.png';

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

  const APIBody = {
    "model": "gpt-4.1-nano",
    "messages": [
      {
        "role": "user",
        "content": "Write one sentence about a frog."
      }
    ],
    "max_tokens": 10
  }

  async function callOpenAiAPI() {
    console.log("Calling the OpenAI API")
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + keyData
      },
      body: JSON.stringify(APIBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
    });
  }

  
  const [starElements, setStarElements] = useState<JSX.Element[]>([]);
  useEffect(() => {
    let stararray: Number[] = [];
    for (let i = 0; i < 100; i++) {
      stararray.push(i);
    }
    const stars = stararray.map((_, index) => {
      const top = Math.random() * 80 + 10;
      const left = Math.random() * 99;
      const animationDuration = Math.random() * 3 + 2;
      const rotation = Math.random() * 360;
      return (
        <div key={index} className='star' style={{top: `${top}%`, left: `${left}%`, rotate: `${rotation}deg`}}><img src={starImg} style={{animationDuration: `${animationDuration}s`}} alt='star'/></div>
      );
    });
    setStarElements([...stars]);
  }, []);
  
  const [rocketElements, setRocketElements] = useState<JSX.Element[]>([]);
  useEffect(() => {
    let rocketArray: Number[] = [];
    for (let i = 0; i < 5; i++) {
      rocketArray.push(i);
    }
    const rockets = rocketArray.map((_, index) => {
      const top = Math.random() * 65 + 20;
      const animationDuration = Math.random() * 110 + 50;
      const width = animationDuration - 20;
      const height = animationDuration - 20;
      const animationDelay = Math.random() * 20;
      return (
        <div key={index} className='Rocket' style={{top: `${top}%`, animationDuration: `${animationDuration}s`, animationDelay: `${animationDelay}s`}}><img src={rocketImg} style={{width: `${width}px`, height: `${height}px`}} alt='rocket'/></div>
      );
    });
    setRocketElements([...rockets]);
  }, []);

  return (
    <div className="App">
      
      <div className="MainWrapper">
        <div>
          {starElements}
          {rocketElements}
        </div>
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
            <Button className="Submit-Button" onClick={callOpenAiAPI}>API test</Button>
          </Form>)
        }
      </div>
    </div>
  );
}

export default App;
