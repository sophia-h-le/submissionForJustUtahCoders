import './App.css';
import React, { useState } from 'react'
import validator from 'validator'
import moment from 'moment'

const App = () => {
  const [ participants, setParticipants] = useState([])
  const addParticipant = (event) => {
    event.preventDefault()
    console.log('submit button clicked', event.target)
    const participantObject = {
      id: newId,
      name: newName,
      email: newEmail,
      birthdate: newBirthDate,
      emailConsent: newConsent
       
    }
    console.log(JSON.stringify(participantObject))
    setParticipants(participants.concat(participantObject))

    fetch("https://my-json-server.typicode.com/JustUtahCoders/interview-users-api/users",
            {
                method: "POST",
                cache: "no-cache",
                headers:{
                    "content_type": "application/json"
                },
                body: JSON.stringify(participantObject)
            })
            .then(response=> response.json())
    setNewId(newId + 1)
    setNewName('')
    setNewEmail('')
    setNewBirthDate('')
    setNewConsent('')
  }

  const [ newId, setNewId ] = useState(0)

  const [ newName, setNewName ] = useState('')
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const [ newEmail, setNewEmail ] = useState('')
  const handleEmailChange = (event) => {
    console.log(event.target.value)
    setNewEmail(event.target.value)
  }

  const [ newBirthDate, setNewBirthDate ] = useState('')
  const handleBirthDateChange = (event) => {
    console.log(event.target.value)
    setNewBirthDate(event.target.value)
  }

  const[ newConsent, setNewConsent ] = useState(false)
  const handleConsentChange = (event) => {
    console.log(event.target.checked)
    setNewConsent(event.target.checked)
  }

  const clearForm = (event) => {
    event.preventDefault()
    console.log('clear button clicked', event.target)
    setNewName('')
    setNewEmail('')
    setNewBirthDate('')
    setNewConsent('')
  }

  const nameValid = (newName !== '');
  const emailValid = validator.isEmail(newEmail);
  const dateFormat = 'YYYY-MM-DD';
  const birthdateToFormat = moment(new Date(newBirthDate)).format(dateFormat);
  const birthdateValid = (newBirthDate === '' || moment(birthdateToFormat, dateFormat, true).isValid());
  const consentValid = (newConsent === true);
  const formValid = (nameValid && emailValid && birthdateValid && consentValid);

  return (
    <div class='ContactUsform'>
      <h2>Contact Us</h2>
      <form onReset={clearForm} onSubmit={addParticipant}>
        <div>
          Name
          <br/>
          <input
          name='name'
          value={newName}
          onChange={handleNameChange}
          placeholder='Name'
          required
          />
        </div>
        <div>
          Email
          <br/>
          <input
          name='email'
          value={newEmail}
          onChange={handleEmailChange}
          placeholder='Email'
          required
          />
        </div>
        <div>
          Birth date
          <br/>
          <input
          name='birthdate'
          value={newBirthDate}
          onChange={handleBirthDateChange}
          placeholder='YYYY-MM-DD'
          />
        </div>
        <div>
        <label>
          <input
            name="emailConsent"
            type="checkbox" 
            checked={newConsent}
            onChange={handleConsentChange}
            required
            />
            I agree to be contacted via email
        </label>
        </div>
        <div>
          <button type='reset' value='reset'>
            Clear</button>
          <button type='submit' value='submit' disabled={!formValid}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
