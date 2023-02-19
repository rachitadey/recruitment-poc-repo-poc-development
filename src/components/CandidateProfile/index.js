import React, { useState, useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const CandidateProfile = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [adhaar, setAdhaar] = useState('');
  const [pan, setPan] = useState('');
  const [primarySkill, setPrimarySkill] = useState('');
  const [secondarySkill, setSecondarySkill] = useState('');
  const [tertiarySkill, setTertiarySkill] = useState('');
  const [year, setYear] = useState('');
  const [currentCtc, setCurrentCtc] = useState('');
  const [expectedCtc, setExpectedCtc] = useState('');
  const [noticePeriod, setNoticePeriod] = useState('15days');
  const [servingNp, setServingNp] = useState(false);
  const [tentativeJoinDate, setTentativeJoinDate] = useState('');
  const [comment, setComment] = useState('');
  const [resume, setResume] = useState();
  const [validated, setValidated] = useState(false);
  const [showCandidateForm, setShowCandidateForm] = useState(false);
  const [recruiterList, setRecruiterList] = useState();
  const currentCandidate = JSON.parse(localStorage.getItem('currentUser'));
  const allCandidate = JSON.parse(localStorage.getItem('canUserList'));
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [pickerValidated, setPickerValidated] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    console.log('allcan', currentCandidate);
    setShowCandidateForm(!currentCandidate.userhasdetails);
    setRecruiterList(JSON.parse(localStorage.getItem('recUserList')));
  }, []);

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const ageHandler = (e) => {
    setAge(e.target.value);
  };

  const phoneHandler = (e) => {
    setPhone(e.target.value);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const aadharHandler = (e) => {
    setAdhaar(e.target.value);
  };

  const panHandler = (e) => {
    setPan(e.target.value);
  };

  const primarySkillHandler = (e) => {
    setPrimarySkill(e.target.value);
  };

  const secondarySkillHandler = (e) => {
    setSecondarySkill(e.target.value);
  };

  const tertiarySkillHandler = (e) => {
    setTertiarySkill(e.target.value);
  };

  const yearHandler = (e) => {
    setYear(e.target.value);
  };

  const curretCtcHandler = (e) => {
    setCurrentCtc(e.target.value);
  };

  const expectedCtcHandler = (e) => {
    setExpectedCtc(e.target.value);
  };

  const noticePeriodHandler = (e) => {
    setNoticePeriod(e.target.value);
  };

  const servingNpHandler = (e) => {
    setServingNp(e.target.checked);
  };

  const tentativeJoinDateHandler = (e) => {
    setTentativeJoinDate(e.target.value);
  };

  const commentHandler = (e) => {
    setComment(e.target.value);
  };

  const resumeHandler = (e) => {
    setResume(e.target.files[0]);
  };

  const candidateDetailsSubmitHandler = (e) => {
    const candidateForm = e.currentTarget;
    const isFormValid = candidateForm.checkValidity();

    e.preventDefault();
    e.stopPropagation();

    if (isFormValid) {
      const candidate = {};

      candidate.name = name;
      candidate.age = age;
      candidate.phone = phone;
      candidate.email = email;
      candidate.adhaar = adhaar;
      candidate.pan = pan;
      candidate.primarySkill = primarySkill;
      candidate.secondarySkill = secondarySkill;
      candidate.tertiarySkill = tertiarySkill;
      candidate.year = year;
      candidate.currentCtc = currentCtc;
      candidate.expectedCtc = expectedCtc;
      candidate.noticePeriod = noticePeriod;
      candidate.servingNp = servingNp;
      candidate.tentativeJoinDate = tentativeJoinDate;
      candidate.comment = comment;
      candidate.resume = resume;

      currentCandidate.userdetails = candidate;
      currentCandidate.userhasdetails = true;
      setShowCandidateForm(false);

      allCandidate.map(r => {
        if (r.name === currentCandidate.name) {
          r.userdetails = currentCandidate.userdetails;
          r.userhasdetails = currentCandidate.userhasdetails;
        }
        return r;
      });
      localStorage.setItem('canUserList', JSON.stringify(allCandidate));
      localStorage.setItem('currentUser', JSON.stringify(currentCandidate));
    }

    setValidated(true);
  };

  const shortlistHandler = () => {
    setShow(true);
  };
  const startDateHandler = (evt) => {
    setStartDate(evt.target.value);
  };
  const endDateHandler = (evt) => {
    setEndDate(evt.target.value);
  };
  const startTimeHandler = (evt) => {
    setStartTime(evt.target.value);
  };
  const endTimeHandler = (evt) => {
    setEndTime(evt.target.value);
  };
  const pickerModalSubmitHandler = (evt) => {
    const recruiterForm = evt.currentTarget;
    const isFormValid = recruiterForm.checkValidity();
    evt.preventDefault();
    evt.stopPropagation();
    if (isFormValid) {
      console.log("START DATE", startDate, "END DATE", endDate, "START TIME", startTime, "END TIME", endTime);
      setShow(false);
    }
    setPickerValidated(true);
  };

  return (
    <>
      <div className="candidate-profile col-md-12 col-lg-6">
        {showCandidateForm &&
          <div className="candidate-profile-form">
            <div className="profile-header">
              Fill up the form below and take a step closer to find your dream job.
            </div>
            <div className="profile-form">
              <Form noValidate validated={validated} onSubmit={candidateDetailsSubmitHandler}>
                <Accordion defaultActiveKey={['personalDetails', 'workDetails']} alwaysOpen>
                  <Accordion.Item eventKey="personalDetails">
                    <Accordion.Header>Personal Details</Accordion.Header>
                    <Accordion.Body>
                      <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your name" required onChange={nameHandler} />
                        <Form.Control.Feedback type="invalid">
                          Please fill up Name.
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="age">
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="number" placeholder="Enter your age in years" required onChange={ageHandler} />
                        <Form.Control.Feedback type="invalid">
                          Please fill up Age.
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="phone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter your phone number" required pattern="[0-9]{10}" onChange={phoneHandler} />
                        <Form.Control.Feedback type="invalid">
                          Please fill up the Phone Number in correct format(10 digits).
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$" onChange={emailHandler} />
                        <Form.Control.Feedback type="invalid">
                          Please fill up the Email.
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="adhaar">
                        <Form.Label>Adhaar Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter your Adhaar number" required pattern="[0-9]{16}" onChange={aadharHandler} />
                        <Form.Control.Feedback type="invalid">
                          Please fill up the Adhaar Number in correct format(16 digits).
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="pan">
                        <Form.Label>PAN</Form.Label>
                        <Form.Control type="text" placeholder="Enter your PAN" required pattern="^[A-Z0-9]{10}$" onChange={panHandler} />
                        <Form.Control.Feedback type="invalid">
                          Please fill up the PAN in correct format(10 characters).
                        </Form.Control.Feedback>
                      </Form.Group>
                      <div style={{color: 'red'}}>* Only to ensure duplicate check. Lilly does not Store the Pan and Adhaar number</div>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="workDetails">
                    <Accordion.Header>Professional Details</Accordion.Header>
                    <Accordion.Body>
                      <Form.Group className="mb-3" controlId="primaryskill">
                        <Form.Label>Primary Skill</Form.Label>
                        <Form.Control type="text" placeholder="Enter the skill you are looking for" required onChange={primarySkillHandler} />
                        <Form.Control.Feedback type="invalid">
                          Please fill up the Primary Skill.
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="secondaryskill">
                        <Form.Label>Secondary Skill</Form.Label>
                        <Form.Control type="text" placeholder="Enter the skill you are looking for" required onChange={secondarySkillHandler} />
                        <Form.Control.Feedback type="invalid">
                          Please fill up the Secondary Skill.
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="tertiaryskill">
                        <Form.Label>Tertiary Skill</Form.Label>
                        <Form.Control type="text" placeholder="Enter the skill you are looking for" required onChange={tertiarySkillHandler} />
                        <Form.Control.Feedback type="invalid">
                          Please fill up the Tertiary Skill.
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="experience">
                        <Form.Label>Year(s) of Experience</Form.Label>
                        <Form.Control type="text" placeholder="Enter year" required onChange={yearHandler} />
                        <Form.Control.Feedback type="invalid">
                          Please fill up the Year(s) of Experience.
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="currectCtc">
                        <Form.Label>Currennt CTC</Form.Label>
                        <Form.Control type="text" placeholder="Current CTC" required onChange={curretCtcHandler} />
                        <Form.Control.Feedback type="invalid">
                          Please fill up Currennt CTC.
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="expectedCtc">
                        <Form.Label>Expected CTC</Form.Label>
                        <Form.Control type="text" placeholder="Expected CTC" required onChange={expectedCtcHandler} />
                        <Form.Control.Feedback type="invalid">
                          Please fill up Expected CTC.
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="noticePeriod">
                        <Form.Label>Notice Period</Form.Label>
                        <Form.Select aria-label="Year(s) of Experience" required onChange={noticePeriodHandler} >
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
                        onChange={servingNpHandler}
                      />

                      <Form.Group className="mb-3" controlId="tentativeJoinDate">
                        <Form.Label>Tentative Joining Date</Form.Label>
                        <Form.Control type="date" placeholder="MM/DD/YYYY" required onChange={tentativeJoinDateHandler} />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as="textarea" placeholder="Do you have anything else to mention?" onChange={commentHandler} />
                      </Form.Group>

                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload Resume (in pdf format)</Form.Label>
                        <Form.Control type="file" onChange={resumeHandler} />
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
        }
      </div>

      <div className="candidate-profile-submitted-container col-md-8 col-lg-8">
        {!showCandidateForm && !currentCandidate.slotTime &&
          <div className="confirmation-header">
            Your application has been submitted. You'll be notified if a recruiter wants to connect with you.
          </div>
        }
        {!showCandidateForm && currentCandidate.slotTime && currentCandidate.slotTime !== '' &&
          <><div className="confirmation-header">
            Recruiter has selected the slot. {currentCandidate.slotTime}
          </div><div className="confirmation-header">
              Please, Choose your avaiable slot.
              <Button variant="primary shortlist-btn float-end" onClick={() => shortlistHandler()}>Choose Your Slot</Button>
            </div></>
        }
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="lg"
          centered
        >
          <Form noValidate validated={pickerValidated} onSubmit={pickerModalSubmitHandler}>
            <Modal.Header closeButton>
              <Modal.Title>Select Time and Date to create slots</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="picker-container">
                <div className="date-picker">
                  <Form.Group className="picker-form-group">
                    <Form.Label htmlFor='start-date'>START DATE</Form.Label>
                    <Form.Control type="date" className="start-date" required onChange={startDateHandler} />
                  </Form.Group>
                  <Form.Group className="picker-form-group">
                    <Form.Label htmlFor='start-date'>END DATE</Form.Label>
                    <Form.Control type="date" className="end-date" required onChange={endDateHandler} />
                  </Form.Group>
                </div>
                <div className="time-picker">
                  <Form.Group className="picker-form-group">
                    <Form.Label htmlFor='start-time'>START TIME</Form.Label>
                    <Form.Control type="time" required onChange={startTimeHandler} className="start-time" />
                  </Form.Group>
                  <Form.Group className="picker-form-group">
                    <Form.Label htmlFor='end-time'>END TIME</Form.Label>
                    <Form.Control type="time" required onChange={endTimeHandler} className="end-time" />
                  </Form.Group>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" >Send</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>

     
    </>
  );
};

export default CandidateProfile;

