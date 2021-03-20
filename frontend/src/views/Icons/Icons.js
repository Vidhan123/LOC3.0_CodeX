/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";
import { Avatar } from '@material-ui/core';
import doctor from '../../assets/img/faces/doctor.png';
import styled from 'styled-components';
import CustomButton from '../../components/CustomButtons/Button';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  ...styles,
  large: {
    width: 125,
    height: 125,
    padding: 2,
    borderRadius: '50%',
    border: '2px solid #ff9800', 
  },
});

export default function Icons() {
  const classes = useStyles();
  const arr = [1, 2, 3, 4, 5];
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader plain color="warning">
            <h4 className={classes.cardTitleWhite}>Appointments</h4>
            <p className={classes.cardCategoryWhite}>
              Click on join to continue.  
            </p>
          </CardHeader>
          <CardBody>
            {arr.map(elem => (
              <StyledDoctorDataContainer>
              <Avatar src={doctor} className={classes.large}/>
              <StyledDoctorData>
                <StyledH6>Doc Name {elem}</StyledH6>
                <StyledP style={{ color: 'gray' }}>Specialization</StyledP>
              </StyledDoctorData>
              <StyledDoctorData>
                <StyledH6>Appointment Summary</StyledH6>
                <StyledP>Time</StyledP>
                <StyledP>Date</StyledP>
                <StyledP>Name</StyledP>
              </StyledDoctorData>
              <StyledDoctorData>
                <CustomButton
                  fullWidth
                  color="success"
                  onClick={() => {}}
                  >
                    <span>Join Meeting</span>
                    {' '}<span style={{ float: 'right' }}><VideoCallIcon style={{ marginLeft: 8, verticalAlign: 'middle' }} /></span>
                </CustomButton>
                <CustomButton
                  fullWidth
                  color="danger"
                  onClick={() => {}}
                  >
                    Cancel Appointment
                    {' '}<CloseIcon style={{ marginLeft: 8, verticalAlign: 'middle' }}/>
                </CustomButton>
              </StyledDoctorData>
            </StyledDoctorDataContainer>
            ))}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

const StyledDoctorDataContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 8px;
  border-bottom: 1px solid #ccc;
  padding: 16px;
`;

const StyledDoctorData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 10px;
`;

const StyledH6 = styled.h6`
  margin: 0 !important;
`;

const StyledP = styled.p`
  margin: 0 !important;
`;