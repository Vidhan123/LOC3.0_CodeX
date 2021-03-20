import React, { useState } from 'react';
import MyMap from '../../components/Map/map';
import styled from 'styled-components';
import { makeStyles } from "@material-ui/core/styles";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput";
import { Link } from 'react-router-dom';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

function MapsNew() {
  const classes = useStyles();
  const pickUpInit = {address:'', lat:0, lng:0};
  const [pickUp,setPickUp] = useState(pickUpInit);
  
  const dropInit = {address:'', lat:0, lng:0};
  const [drop,setDrop] = useState(dropInit);

  const [mapInit, setMapInit] = useState(false);

  const doctor = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return(
    <React.Fragment>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Doctors</h4>
          <p className={classes.cardCategoryWhite}>
            Find the best doctors and medical assistants, <b>nearest to you!</b>
          </p>
        </CardHeader>
        <CardBody>
          <GridContainer>
              <GridItem xs={12} sm={12} md={8}>
                <MyMap 
                pU={pickUp}
                sPU={setPickUp} 
                d={drop} 
                sD={setDrop} 
                // iD={isDriver}
                // sS={setStep} 
                mI={mapInit}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <h5>Search as per need...</h5>
                  <CustomInput
                    labelText="Search by Name"
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                  <CustomInput
                    labelText="Search by Specialization"
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                  <StyledButton
                  fullWidth
                  color="primary"
                  onClick={() => {}}
                  >
                    Apply Location Filter
                  </StyledButton>
                </GridItem>
            </GridContainer>
        </CardBody>
      </Card>
      <StyledDoctorContainer>
        {doctor.map(elem => (
          <Card>
          <CardHeader color="primary">
            Doctor {elem}
          </CardHeader>
          <CardBody>
            Specialization {elem}
            <StyledButton
                  fullWidth
                  color="primary"
                  onClick={() => {}}
                  >
                    <Link to={`/doctor/appointment/60559d28db76936bc4481cca`}>
                      Book an Appointment
                    </Link>
                  </StyledButton>
          </CardBody>
          </Card>
        ))}
      </StyledDoctorContainer>
    </React.Fragment>
  )
}

export default MapsNew;

const StyledButton = styled(Button)`
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