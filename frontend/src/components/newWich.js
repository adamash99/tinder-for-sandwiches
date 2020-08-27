import React, { useState } from 'react';
import { Card, Button, Accordion, Form } from 'react-bootstrap';



export default () => {

  const [mainsText, setMainsText] = useState("")
  const [condimentsText, setCondimentsText] = useState("")
  const [breadText, setBreadText] = useState("")

  const submitClicked = () => {
    const body = JSON.stringify({
      mains: mainsText.split(/\r?\n/),
      condiments: condimentsText.split(/\r?\n/),
      bread: breadText,
    })
    const headers = { "Content-type": "application/json; charset=UTF-8" }

    fetch('/api/addwich', { method: "PUT", body: body, headers: headers })
  }

  return (
    <Accordion>
      <Card bg="secondary" >
        <Card.Header>
          <Accordion.Toggle as={Button} eventKey="0">
            Add a sandwich
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Form onSubmit={submitClicked}>
              <Form.Group controlId="mains">
                <Form.Label>Sandwich Mains (eg turkey, swiss cheese, peanut butter):</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="4"
                  placeholder="Please enter each main on a new line without punctuation"
                  onChange={(event) => setMainsText(event.target.value)}>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="extras">
                <Form.Label>Sandwich Extras/Condiments (eg pickles, mustard, sauce):</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="4"
                  placeholder="Please enter each condiment on a new line without punctuation"
                  onChange={(event) => setCondimentsText(event.target.value)}>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="bread">
                <Form.Label>Bread</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="What kind of bread is your sandwich on?"
                  onChange={(event) => setBreadText(event.target.value)}>
                </Form.Control>
              </Form.Group>
              <Button type="submit">Submit your Sandwich!</Button>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}