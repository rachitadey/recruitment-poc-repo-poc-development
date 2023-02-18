import React, { useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const CandidateProfile = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [enail, setEmail] = useState('');
  const [adhaar, setAdhaar] = useState('');
  const [pan, setPan] = useState('');
  const [year, setYear] = useState('');
  const [currentCtc, setCurrentCtc] = useState('');
  const [expectedCtc, setExpectedCtc] = useState('');
  const [noticePeriod, setNoticePeriod] = useState('15days');
  const [servingNp, setServingNp] = useState(false);
  const [tentativeJoinDate, setTentativeJoinDate] = useState('');

  const candidateDetailsSubmitHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('submit');
  }
  return (
    <div className="candidate-profile col-md-5 col-lg-5">
      <div className="profile-header">
        Fill up the form below and take a step closer to find your dream job.
      </div>
      <div className="profile-form">
        <Form noValidate onSubmit={candidateDetailsSubmitHandler}>
          <Accordion defaultActiveKey={['personalDetails', 'workDetails']} alwaysOpen>
            <Accordion.Item eventKey="personalDetails">
              <Accordion.Header>Persoal Details</Accordion.Header>
              <Accordion.Body>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="age">
                  <Form.Label>Age</Form.Label>
                  <Form.Control type="number" placeholder="Enter your age in years" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="text" placeholder="Enter your phone number" required pattern="[0-9]{10}" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="adhaar">
                  <Form.Label>Adhaar Number</Form.Label>
                  <Form.Control type="text" placeholder="Enter your Adhaar number" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="pan">
                  <Form.Label>PAN</Form.Label>
                  <Form.Control type="text" placeholder="Enter your PAN" required />
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="workDetails">
              <Accordion.Header>Professional Details</Accordion.Header>
              <Accordion.Body>
                <Form.Group className="mb-3" controlId="primaryskill">
                  <Form.Label>Primary Skill</Form.Label>
                  <Form.Control type="text" placeholder="Enter the skill you are looking for" required />
                  <Form.Control.Feedback type="invalid">
                    Please fill up the Primary Skill.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="secondaryskill">
                  <Form.Label>Secondary Skill</Form.Label>
                  <Form.Control type="text" placeholder="Enter the skill you are looking for" required />
                  <Form.Control.Feedback type="invalid">
                    Please fill up the Secondary Skill.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="tertiaryskill">
                  <Form.Label>Tertiary Skill</Form.Label>
                  <Form.Control type="text" placeholder="Enter the skill you are looking for" required />
                  <Form.Control.Feedback type="invalid">
                    Please fill up the Tertiary Skill.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="experience">
                  <Form.Label>Year(s) of Experience</Form.Label>
                  <Form.Control type="text" placeholder="Enter year" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="currectCtc">
                  <Form.Label>Currennt CTC</Form.Label>
                  <Form.Control type="text" placeholder="Current CTC" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="expectedCtc">
                  <Form.Label>Expected CTC</Form.Label>
                  <Form.Control type="text" placeholder="Expected CTC" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="noticePeriod">
                  <Form.Label>Notice Period</Form.Label>
                  <Form.Select aria-label="Year(s) of Experience" required>
                    <option value="15days">15 days</option>
                    <option value="1month">1 Month</option>
                    <option value="2month">2 Months</option>
                    <option value="3month">3 Months</option>
                  </Form.Select>
                </Form.Group>

                <Form.Check
                  inline
                  label="Serving Notice Period"
                  name="serving-np"
                  type="checkbox"
                  id="servingNp"
                  className="mb-3"
                />

                <Form.Group className="mb-3" controlId="tentativeJoinDate">
                  <Form.Label>Tentative Joining Date</Form.Label>
                  <Form.Control type="text" placeholder="DD/MM/YYYY" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="comment">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control as="textarea" placeholder="Do you have anything else to mention?" />
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Button variant="primary" type="submit" className="submit-btn">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CandidateProfile;

