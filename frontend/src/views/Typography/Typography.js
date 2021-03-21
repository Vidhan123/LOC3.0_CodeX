import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Quote from "components/Typography/Quote.js";
import Muted from "components/Typography/Muted.js";
import Primary from "components/Typography/Primary.js";
import Info from "components/Typography/Info.js";
import Success from "components/Typography/Success.js";
import Warning from "components/Typography/Warning.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CustomButton from "components/CustomButtons/Button.js";
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Avatar } from '@material-ui/core';
import userImg from '../../assets/img/faces/doctor.png';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import {GlobalContext} from '../../GlobalContext';
import { Input } from '@material-ui/core';

import styled from 'styled-components';
import api from '../../utils/api';

import Notify from '../../notification/Notify';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
    padding: 8,
  },
  avatar: {
    height: 200,
    width: 200,
  },
}));

export default function TypographyPage() {
  const { allDocs, user } = useContext(GlobalContext);
  const [ userData, setUserData ] = user;
  const [ allDoctors, setAllDoctors ] = allDocs;
  const { docId } = useParams();
  const history = useHistory();
  console.log(docId);
  const classes = useStyles();

  const [doctor, setDoctor] = useState({});

  useEffect(() => {
    const fetchDoctorHandler = async () => {
      setDoctor(await api.searchParticularDoctor(docId));
    };
    fetchDoctorHandler();
  }, [docId]);

  console.log(doctor);

  const [bookAppointment, setBookAppointment] = useState({
    doctorId: docId,
    dateTime: "2021-03-20T10:30",
    description: "",
  });
  const [file, setFile] = useState();

  useEffect(() => {
    console.log(bookAppointment);
  }, [bookAppointment]);

  function getSteps() {
    return ['Choose a Doctor', 'Choose Date and Time', 'Write a Description of your Illness', 'Upload Medical Record'];
  }

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <form className={classes.container} noValidate>
          {/* <Avatar src={userImg} className={classes.avatar}/> */}
          <h5 style={{ margin: 8 }}>You have chosen {doctor.name} to assist you. Kindly complete the remaining steps to confirm appointment</h5>
        </form>;
      case 1:
        return (<form className={classes.container} noValidate>
          <TextField
            id="datetime-local"
            label="Appointment Date and Time"
            type="datetime-local"
            defaultValue="2021-03-20T10:30"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setBookAppointment({
                ...bookAppointment,
                dateTime: e.target.value,
              });
            }}
          />
        </form>);
      case 2:
        return (
          <form className={classes.container}>
            <StyledTextArea aria-label="minimum height" rowsMin={3} placeholder="Minimum 3 rows" onChange={(e) => {
              setBookAppointment({
                ...bookAppointment,
                description: e.target.value,
              });
            }}/>
        </form>
        );
      case 3:
        return (
          <StyledFileInputContainer className={classes.container}>
            <StyledFileInput type="file" placeholder="Upload File" variant="outlined" onChange={(e) => {
              setFile(e.target.files[0]);
              console.log(e.target.files);
            }}/>
        </StyledFileInputContainer>
        );
      default:
        return 'Unknown stepIndex';
    }
  }

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if(activeStep === steps.length - 1){
      const data = await api.createAppointment(bookAppointment.doctorId, bookAppointment.dateTime, bookAppointment.description, userData._id);
      const fls = await api.uploadDoc(data._id, file);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setBookAppointment({
      doctorId: docId,
      dateTime: "",
      description: "",
    });
  };

  return (
    <>
    <Card>
      <CardHeader color="warning">
        <h4 className={classes.cardTitleWhite}>Book an instant appointment</h4>
        <p className={classes.cardCategoryWhite}>
          Kindly fill the form to book an appointment
        </p>
      </CardHeader>
      <CardBody>
        <GridContainer>
          <StyledGridItem className={classes.root} xs={12} sm={12} md={8}>
            <Stepper activeStep={activeStep} alternativeLabel style={{ marginTop: 30 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div style={{ marginTop: 30 }}>
              {activeStep === steps.length ? (
                <div>
                  <Typography className={classes.instructions}>All steps completed</Typography>
                  <Button onClick={handleReset}>Reset</Button>
                </div>
              ) : (
                <div style={{ marginTop: 30, textAlign: 'center', margin: 'auto' }}>
                  <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                  <div>
                    <CustomButton
                    //fullWidth
                    color="warning"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                    >
                      Back
                    </CustomButton>
                    {activeStep !== steps.length - 1 ?
                    <CustomButton variant="contained" color="warning" onClick={handleNext}>Next
                      </CustomButton>:
                      <div style={{display: "inline-block"}} onClick={handleNext}>
                        <Notify msg={`Appointment scheduled with ${doctor.name}`} />
                      </div>
                    }
                    
                  </div>
                </div>
              )}
            </div>
          </StyledGridItem>
          <GridItem xs={12} sm={12} md={4}>
            <StyledRightComponent>
              <Avatar src={userImg} className={classes.avatar}/>
              <h3 style={{ margin: 0, marginLeft: 22 }}>{doctor.name}</h3>
              <h6 style={{ margin: 0, marginLeft: 22 }}>{doctor.specialization === null ? "NOT SPECIFIED" : doctor.specialization}</h6>
              <p style={{ margin: 0, marginLeft: 22 }}>{doctor.about}</p>
            </StyledRightComponent>
          </GridItem>
        </GridContainer>
      </CardBody>
    </Card>
    <h3 style={{ marginLeft: 6 }}>Other Doctors devoted to Health</h3>
    <StyledDoctorContainer>
    {allDoctors.map(elem => (
      <Card>
      <CardHeader color="warning" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
        <img src={userImg} width={25} height={25} style={{ borderRadius: '50%', marginRight: 8 }}/>
        <span style={{ textTransform: 'capitalize' }}>{elem.name}</span>
      </CardHeader>
      <CardBody>
        <StyledIndividualDoctorPanel>
          <span style={{ textTransform: 'capitalize' }}>Specialization: {elem.specialization === null ? "Not Specified" : elem.specialization}</span>
          <span style={{ textTransform: 'capitalize' }}>Gender: {elem.sex === null ? "NOT SPECIFIED" : elem.sex}</span>
          <span>Age: {elem.age === null || elem.age === "" ? "Not Specified" : elem.age}</span>
          <span style={{ borderTop: 'solid', borderColor: "#ccc", borderWidth: 1, padding: '4px auto', margin: '4px 0' }}>About: {elem.about === "" ? "Not Specified" : elem.about}</span>
        </StyledIndividualDoctorPanel>
        <StyledButton
              fullWidth
              color="warning"
              onClick={() => {
                history.push(`/user/bookAppointment/${elem._id}`);
              }}
              >
                Book an Appointment
                {/* <Link to={`/bookAppointment/3`} style={{ color: '#fff' }}>
                  Book an Appointment
                </Link> */}
              </StyledButton>
      </CardBody>
      </Card>
    ))}
  </StyledDoctorContainer>
  </>
  );
}

const StyledFileInputContainer = styled.button`
  width: 75% !important;
  text-align: center;
  margin: auto;
  border-radius: 6px;
  background-color: #fafafa;
`;

const StyledFileInput = styled.input`
  border-radius: 10px;
  padding: 12px;
  width: 100%;
`;

const StyledGridItem = styled(GridItem)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center !important;
`;

const StyledTextArea = styled(TextareaAutosize)`
  width: 75%;
  border-radius: 8px;
  font-family: sans-serif !important;
  padding: 8px !important;
`;

const StyledRightComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 8px;
  gap: 12px;
`;

const StyledButton = styled(CustomButton)`
  margin: 16px auto;
`;

const StyledDoctorContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  column-gap: 12px;
  row-gap: 12px;
  justify-content: center;
  align-items: center;
`;

const StyledIndividualDoctorPanel = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 6px;
`;