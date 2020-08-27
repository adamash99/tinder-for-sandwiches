import React, { useState, useEffect } from 'react';
import './App.css';
import { Button } from 'react-bootstrap'
import NewWich from './components/NewWich.js'


function App() {

  const [wiches, setWiches] = useState([])
  const [wichNumber, setWichNumber] = useState(0)
  const [wichText, setWichText] = useState("")

  const swipeClicked = (posVote) => {
    const sand_id = wiches[wichNumber]['id']
    console.log('/votewich/' + sand_id + "/" + (posVote ? "yes" : "no"))
    fetch('/votewich/' + sand_id + "/" + (posVote ? "yes" : "no"), { method: "PUT" })
    setWichNumber(wichNumber + 1)
  }

  // gets list of sandwiches
  useEffect(() => {
    fetch('/getwich')
      .then(response => response.json())
      .then(data => setWiches(data))
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }, [])


  //updates the wich text
  useEffect(() => {
    if (wiches.length > 0 && wichNumber < wiches.length) {
      const wich = wiches[wichNumber]
      var text = "A "
      for (var i = 0; i < wich['mains'].length; i++) {
        text += wich['mains'][i] + " "
        if (i < wich['mains'].length - 1) {
          text += "and "
        }
      }
      text += "sandwich with "
      for (i = 0; i < wich['condiments'].length; i++) {
        text += wich['condiments'][i] + " "
        if (i < wich['condiments'].length - 1) {
          text += "and "
        }
      }
      text += "on "
      text += wich['bread'] + "."
      setWichText(text)
    }
  })

  if (wiches.length === 0) {
    return (
      <div id="not-loading">
        Hey
      </div>
    )
  }

  if (wichNumber === wiches.length) {
    return (
      <div className="App" id="no-more-wiches">
        <NewWich />
        <p>You've swiped on every sandwich! There's no more to show you. </p>
      </div>
    )
  }


  return (
    <div className="App">
      <NewWich />
      <br />
      <br />
      <p>{wichText}</p>
      <Button variant="outline-danger" onClick={() => swipeClicked(false)}>Yucky. Swipe Left!</Button>
      <Button variant="outline-success" onClick={() => swipeClicked(true)}>I'd eat that. Swipe Right!</Button>
    </div>
  );
}

export default App;
