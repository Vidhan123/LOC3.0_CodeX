import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
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

import styled from 'styled-components';
import api from '../../utils/api';

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
}));

export default function TypographyPage() {
  const { docId } = useParams();
  console.log(docId);
  const classes = useStyles();

  const [doctor, setDoctor] = useState({});

  useEffect(() => {
    const fetchDoctorHandler = async () => {
      setDoctor(await api.searchParticularDoctor(docId));
    };
    console.log(doctor);
    fetchDoctorHandler();
  }, [docId]);

  const [bookAppointment, setBookAppointment] = useState({
    doctorId: docId,
    dateTime: "",
    description: "",
  });

  useEffect(() => {
    console.log(bookAppointment);
  }, [bookAppointment]);

  function getSteps() {
    return ['Choose a Doctor', 'Choose Date and Time', 'Write a Description of your Illness'];
  }

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <form className={classes.container} noValidate>
          <Avatar style={{ backgroundColor: 'red' }}>DC</Avatar>
          <h3>Doctor 1</h3>
          <h3>Specialization</h3>
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
            <StyledTextArea aria-label="minimum height" rowsMin={3} placeholder="Minimum 3 rows" />
        </form>
        );
      default:
        return 'Unknown stepIndex';
    }
  }

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Card>
      <CardHeader color="warning">
        <h4 className={classes.cardTitleWhite}>Book an instant appointment</h4>
        <p className={classes.cardCategoryWhite}>
          Kindly fill the form to book an appointment
        </p>
      </CardHeader>
      <CardBody>
        <div className={classes.root}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>All steps completed</Typography>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
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
                  <CustomButton variant="contained" color="warning" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </CustomButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

const StyledTextArea = styled(TextareaAutosize)`
  width: 75%;
  border-radius: 12px;
  font-family: sans-serif !important;
`;