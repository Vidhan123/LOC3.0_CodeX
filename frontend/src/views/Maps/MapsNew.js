import React, { useState, useEffect, useContext } from 'react';
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
import api from 'utils/api';
import userImg from '../../assets/img/faces/doctor.png';
import { useHistory } from 'react-router-dom';
import {GlobalContext} from '../../GlobalContext';

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
  const { allDocs } = useContext(GlobalContext);
  const [ allDoctors, setAllDoctors ] = allDocs;
  const history = useHistory();
  const classes = useStyles();
  const pickUpInit = {address:'', lat:0, lng:0};
  const [pickUp,setPickUp] = useState(pickUpInit);
  
  const dropInit = {address:'', lat:0, lng:0};
  const [drop,setDrop] = useState(dropInit);

  const [mapInit, setMapInit] = useState(false);

  useEffect(() => {
    console.log(pickUp);
  }, [pickUp]);

  useEffect(() => {
    const getDoctorData = async () => {
      setAllDoctors(await api.getDoctors());
    };
    getDoctorData();
  }, []);

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
                    inputProps={{
                      onChange: async (e) => {
                        setAllDoctors(await api.searchDoctorByName(e.target.value));
                      }
                    }}
                  />
                  <CustomInput
                    labelText="Search by Specialization"
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: async (e) => {
                        setAllDoctors(await api.searchDoctorBySpecialization(e.target.value));
                        console.log(1);
                      }
                    }}
                  />
                  <StyledButton
                  fullWidth
                  color="primary"
                  onClick={() => {
                    console.log(pickUp);
                    const docArr = allDoctors.filter(elem => elem.location.latitude === 72.8777);
                    console.log(docArr);
                    console.log(docArr);
                    setAllDoctors(docArr);
                  }}
                  >
                    Apply Location Filter
                  </StyledButton>
                </GridItem>
            </GridContainer>
        </CardBody>
      </Card>
      <StyledDoctorContainer>
        {allDoctors.map(elem => (
          <Card>
          <CardHeader color="primary" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
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
                  color="primary"
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

const StyledIndividualDoctorPanel = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 6px;
`;