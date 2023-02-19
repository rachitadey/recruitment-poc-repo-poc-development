import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

const RecruiterProfile = () => {
  const [primarySkill, setPrimarySkill] = useState('');
  const [primarySkillWeight, setPrimarySkillWeight] = useState('50%');
  const [secondarySkill, setSecondarySkill] = useState('');
  const [secondarySkillWeight, setSecondarySkillWeight] = useState('30%');
  const [tertiarySkill, setTertiarySkill] = useState('');
  const [tertiarySkillWeight, setTertiarySkillWeight] = useState('20%');
  const [relatedWords, setRelatedWords] = useState('');
  const [experience, setExperience] = useState('0-1');
  const [employmentType, setEmploymentType] = useState('full');
  const [ctc, setCtc] = useState('1lakh-3lakh');
  const [validated, setValidated] = useState(false);
  const [showRecruiterForm, setShowRecruiterForm] = useState(false);
  const [candidateList, setCandidateList] = useState([]);
  const allCandidate = JSON.parse(localStorage.getItem('canUserList'));
  const currentRecruiter = JSON.parse(localStorage.getItem('currentUser'));
  const allRecruiter = JSON.parse(localStorage.getItem('recUserList'));
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [pickerValidated, setPickerValidated] = useState(false);

  const [show, setShow] = useState(false);
  const [shortlistedSuccess, setShortlistedSuccess] = useState(false)
  const [shortlistedProfile, setShortlistedProfile] = useState(null)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setShowRecruiterForm(!currentRecruiter.userhasdetails);
    // setCandidateList(JSON.parse(localStorage.getItem('canUserList')));
  }, []);

  const primarySkillHandler = (e) => {
    setPrimarySkill(e.target.value);
  };

  const primarySkillWeightHAndler = (e) => {
    setPrimarySkillWeight(e.target.value);
  };

  const secondarySkillHandler = (e) => {
    setSecondarySkill(e.target.value);
  };

  const secondarySkillWeightHandler = (e) => {
    setSecondarySkillWeight(e.target.value);
  };

  const tertiarySkillHandler = (e) => {
    setTertiarySkill(e.target.value);
  };

  const tertiarySkillWeightHandler = (e) => {
    setTertiarySkillWeight(e.target.value);
  };

  const relatedWordsHandler = (e) => {
    setRelatedWords(e.target.value);
  };

  const experienceHandler = (e) => {
    setExperience(e.target.value);
  };

  const employmentTypeHandler = (e) => {
    setEmploymentType(e.target.value);
  };

  const ctcHandler = (e) => {
    setCtc(e.target.value);
  };

  const recruiterDetailsSubmitHandler = (e) => {
    const recruiterForm = e.currentTarget;
    const isFormValid = recruiterForm.checkValidity();

    e.preventDefault();
    e.stopPropagation();

    if (isFormValid) {
      const recruiter = {};

      recruiter.primarySkill = primarySkill;
      recruiter.primarySkillWeight = primarySkillWeight;
      recruiter.secondarySkill = secondarySkill;
      recruiter.secondarySkillWeight = secondarySkillWeight;
      recruiter.tertiarySkill = tertiarySkill;
      recruiter.tertiarySkillWeight = tertiarySkillWeight;
      recruiter.relatedWords = relatedWords;
      recruiter.experience = experience;
      recruiter.employmentType = employmentType;
      recruiter.ctc = ctc;

      currentRecruiter.userdetails = recruiter;
      currentRecruiter.userhasdetails = true;
      

      allRecruiter.map(r => {
        if (r.name === currentRecruiter.name) {
          r.userdetails = currentRecruiter.userdetails;
          r.userhasdetails = currentRecruiter.userhasdetails;
        }
        return r;
      });
      sortingCandidateList();
      localStorage.setItem('recUserList', JSON.stringify(allRecruiter));
      localStorage.setItem('currentUser', JSON.stringify(currentRecruiter));

      setShowRecruiterForm(false);
    }
    setValidated(true);
  };

  const GetAllIndexes = (cRequirement, rRequirment)  =>
  {
    let cSkill = []
    if (cRequirement){
     cSkill = cRequirement.split(",");
    }
    const rSkill = rRequirment.split(",");
    console.log(cSkill);
    var c = rSkill.filter(value => cSkill.includes(value))
    return c;
  }
  const CheckForRequirement = (candidate) =>{
    const findPrimary = GetAllIndexes(candidate.userdetails.primarySkill, primarySkill).length;
    const findSecondary = GetAllIndexes(candidate.userdetails.secondarySkill, secondarySkill).length;
    const findTertiary  = GetAllIndexes(candidate.userdetails.tertiarySkill, tertiarySkill).length;
    const calculate = ((parseInt(primarySkillWeight) / 100) * findPrimary) + ((parseInt(secondarySkillWeight) / 100) * findSecondary) + ((parseInt(tertiarySkillWeight) / 100) * findTertiary);
    return calculate;


  }
  const sortingCandidateList = () =>{
    const tempSortedCandidateList = [];
    console.log('allCandidate',allCandidate);
    allCandidate.forEach(element => { 
      const totalweight = CheckForRequirement(element);
      console.log('total', totalweight);
      if (totalweight > 0){
        element.matchCalculation = totalweight;
        tempSortedCandidateList.push(element);
      }
    });
    console.log('aa', tempSortedCandidateList);
    const srt = tempSortedCandidateList.sort((a,b)=>b.matchCalculation-a.matchCalculation)
    setCandidateList(srt)
  }

  const shortlistHandler = (data) => {
    console.log('currentShortlisted', data);
    localStorage.setItem("currentShortlisted", JSON.stringify(data));
    setShortlistedProfile(data)
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
      const currentShortlistedCan = JSON.parse(localStorage.getItem('currentShortlisted'))
      allCandidate.map(r => {
        if (r.name === currentShortlistedCan.name) {
          r.slotTime = "START DATE" + startDate + "END DATE"+ endDate + "START TIME" + startTime + "END TIME" + endTime;
        }
        return r;
      });
      localStorage.setItem('canUserList', JSON.stringify(allCandidate));
      console.log("START DATE", startDate, "END DATE", endDate, "START TIME", startTime, "END TIME", endTime);
      setShow(false);
      setShortlistedSuccess(true)
    }
    setPickerValidated(true);
  };

  const reloadRecruiterForm = () => {
    setShowRecruiterForm(true);
    setShortlistedSuccess(false);
    setShortlistedProfile(null);
    setValidated(false);
    setPrimarySkill('');
    setPrimarySkillWeight('50%');
    setSecondarySkill('');
    setSecondarySkillWeight('30%');
    setTertiarySkill('');
    setTertiarySkillWeight('20%');
    setRelatedWords('');
    setExperience('0-1');
    setEmploymentType('full');
    setCtc('1lakh-3lakh');
  };

  return (
    <>
      <div className="recruiter-profile col-md-12 col-lg-6">
        {showRecruiterForm &&
          <div className="recruiter-profile-form">
            <div className="profile-header">
              Fill up the form below and find the best profiles matching your requirement
            </div>
            <div className="profile-form">
              <Form noValidate validated={validated} onSubmit={recruiterDetailsSubmitHandler}>
                <div className="row">
                  <Form.Group className="mb-3 col-md-10 col-lg-10" controlId="primaryskill">
                    <Form.Label>Primary Skill</Form.Label>
                    <Form.Control type="text" placeholder="Enter the skill you are looking for" required onChange={primarySkillHandler} />
                    <Form.Control.Feedback type="invalid">
                      Please fill up the Primary Skill.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3 col-md-2 col-lg-2" controlId="primaryskillweightage">
                    <Form.Label>Weightage</Form.Label>
                    <Form.Select aria-label="Weightage" required onChange={primarySkillWeightHAndler} >
                      <option value="20%">20%</option>
                      <option value="30%">30%</option>
                      <option value="50%" selected>50%</option>
                      <option value="70%">70%</option>
                      <option value="100%">100%</option>
                    </Form.Select>
                  </Form.Group>
                </div>

                <div className="row">
                  <Form.Group className="mb-3 col-md-10 col-lg-10" controlId="secondaryskill">
                    <Form.Label>Secondary Skill</Form.Label>
                    <Form.Control type="text" placeholder="Enter the skill you are looking for" required onChange={secondarySkillHandler} />
                    <Form.Control.Feedback type="invalid">
                      Please fill up the Secondary Skill.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3 col-md-2 col-lg-2" controlId="secondaryskillweightage" onChange={secondarySkillWeightHandler} >
                    <Form.Label>Weightage</Form.Label>
                    <Form.Select aria-label="Weightage" required>
                      <option value="20%">20%</option>
                      <option value="30%" selected>30%</option>
                      <option value="50%">50%</option>
                      <option value="70%">70%</option>
                      <option value="100%">100%</option>
                    </Form.Select>
                  </Form.Group>
                </div>

                <div className="row">
                  <Form.Group className="mb-3 col-md-10 col-lg-10" controlId="tertiaryskill">
                    <Form.Label>Tertiary Skill</Form.Label>
                    <Form.Control type="text" placeholder="Enter the skill you are looking for" required onChange={tertiarySkillHandler} />
                    <Form.Control.Feedback type="invalid">
                      Please fill up the Tertiary Skill.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3 col-md-2 col-lg-2" controlId="tertiaryskillweightage">
                    <Form.Label>Weightage</Form.Label>
                    <Form.Select aria-label="Weightage" required onChange={tertiarySkillWeightHandler} >
                      <option value="20%" selected>20%</option>
                      <option value="30%">30%</option>
                      <option value="50%">50%</option>
                      <option value="70%">70%</option>
                      <option value="100%">100%</option>
                    </Form.Select>
                  </Form.Group>
                </div>

                <Form.Group className="mb-3" controlId="relatedskill">
                  <Form.Label>Related Keywords</Form.Label>
                  <Form.Control as="textarea" placeholder="Enter comma separated words" onChange={relatedWordsHandler} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="years">
                  <Form.Label>Year(s) of Experience</Form.Label>
                  <Form.Select aria-label="Year(s) of Experience" required onChange={experienceHandler} >
                    <option value="0-1">0-1</option>
                    <option value="1-3">1-3</option>
                    <option value="3-5">3-5</option>
                    <option value="5-8">5-8</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="type">
                  <Form.Label>Type of Employment</Form.Label>
                  <Form.Select aria-label="Type of Employment" required onChange={employmentTypeHandler} >
                    <option value="full">Full Time</option>
                    <option value="contract">Contract</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="expectedctc">
                  <Form.Label>Expected CTC</Form.Label>
                  <Form.Select aria-label="Expected CTC" required onChange={ctcHandler} >
                    <option value="1lakh-3lakh">1lakh - 3lakh</option>
                    <option value="3lakh-6lakh">3lakh - 6lakh</option>
                    <option value="6lakh-10lakh">6lakh - 10lakh</option>
                    <option value="10lakh-15lakh">10lakh - 15lakh</option>
                    <option value="15lakh-20lakh">15lakh - 20lakh</option>
                    <option value="20lakh-above">20lakh & above</option>
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" className="submit-btn">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        }
      </div>

      <div className="candidate-container col-md-8 col-lg-8">
        {!showRecruiterForm && !!candidateList.length && !shortlistedSuccess &&
          <div className="matched-candidate-container row">
            <div className="candidate-container-header col-lg-11">
              Check the best matching profiles as per your requiremet.
              <Button variant="primary update-btn float-end" onClick={reloadRecruiterForm}>Update Requirement</Button>
            </div>
            {candidateList.map((candidate, i) =>
              <Card key={i} className="candidate-info col-lg-5">
                <Card.Body>
                  <Card.Title>{candidate.name}</Card.Title>
                  <Card.Title>Rank: {i + 1}</Card.Title>
                  <Card.Title>Score: {candidate.matchCalculation * 100}</Card.Title>
                  <Card.Text>
                    Primary Skill: {candidate.userdetails.primarySkill}
                  </Card.Text>
                  <Card.Text>
                    Secondary Skill: {candidate.userdetails.secondarySkill}
                  </Card.Text>
                  <Card.Text>
                    Tertiary Skill: {candidate.userdetails.tertiarySkill}
                  </Card.Text>
                  <Card.Text>
                    Year(s) of Experience: {candidate.userdetails.year}
                  </Card.Text>
                  <Card.Text>
                    Current CTC: {candidate.userdetails.currentCtc}
                  </Card.Text>
                  <Card.Text>
                    Expected CTC: {candidate.userdetails.expectedCtc}
                  </Card.Text>
                  <Card.Text>
                    Notice Period: {candidate.userdetails.noticePeriod}
                  </Card.Text>
                  <Card.Text>
                    Serving Notice Period: {candidate.userdetails.servingNp ? "Yes" : "No"}
                  </Card.Text>
                  <Card.Text>
                    Tentative Joining Date: {candidate.userdetails.tentativeJoinDate}
                  </Card.Text>
                  <Button variant="primary shortlist-btn float-end" onClick={() => shortlistHandler(candidate)}>Shortlist</Button>
                </Card.Body>
              </Card>
            )}
          </div>
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

        {!showRecruiterForm && !candidateList.length && !shortlistedSuccess &&
          <div className="no-matched-candidate">
            There are no matching profile avaiable. Please try after modifying your requirement.
            <Button variant="primary" type="submit" onClick={reloadRecruiterForm}>
              Refine Search
            </Button>
          </div>
        }
        {console.log('as',shortlistedProfile)}
        { shortlistedSuccess && shortlistedProfile &&
        <div className="no-matched-candidate">
        {shortlistedProfile.name} has been shortlisted. slottime is {shortlistedProfile.slotTime}.
        <Button variant="primary update-btn float-end" onClick={reloadRecruiterForm}>Update Requirement</Button>
      </div>
        }

      </div>
    </>
  );
};

export default RecruiterProfile;