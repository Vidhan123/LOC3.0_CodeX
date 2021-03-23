/*eslint-disable*/
import React, { useState, useEffect, useContext } from "react";
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
import { Avatar } from "@material-ui/core";
import doctor from "../../assets/img/faces/doctor.png";
import styled from "styled-components";
import CustomButton from "../../components/CustomButtons/Button";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import CloseIcon from "@material-ui/icons/Close";
import api from "../../utils/api";
import { GlobalContext } from "../../GlobalContext";

const useStyles = makeStyles({
  ...styles,
  large: {
    width: 125,
    height: 125,
    padding: 2,
    borderRadius: "50%",
    border: "2px solid #ff9800",
  },
});

export default function Icons() {
  const [uApp, setUpp] = useState([]);

  const [pApp, setPpp] = useState([]);

  const { user } = useContext(GlobalContext);
  const [userData, setUserData] = user;

  useEffect(() => {
    const mf = async () => {
      const data = await api.getAllAppointments("6056c3a829eca020d81bbb53");
      console.log(data);
      let j = 1,
        k = 1;
      let upp = [],
        ppp = [];
      for (let i = 0; i < data.length; i++) {
        if (i < 2 || i > 3) {
          upp.push({
            imgUrl: "../assets/doctor.jpeg",
            name: data[i].doctorId.name,
            Specialization: data[i].doctorId.specialization,
            When: Date(data[i].date),
          });
          j++;
        } else {
          ppp.push([
            `${j}`,
            data[i].doctorId.name,
            data[i].date,
            data[i].status,
          ]);
          k++;
        }
      }
      setUpp(upp);
      setPpp(ppp);
    };
    mf();
  }, []);

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
            {uApp.map((elem) => (
              <StyledDoctorDataContainer>
                <Avatar src={doctor} className={classes.large} />
                <StyledDoctorData>
                  <StyledH6>{elem.name}</StyledH6>
                  <StyledP style={{ color: "gray" }}>
                    {elem.Specialization}
                  </StyledP>
                </StyledDoctorData>
                <StyledDoctorData>
                  <StyledH6>Appointment Summary</StyledH6>
                  <StyledP>When:</StyledP>
                  <StyledP>{elem.When}</StyledP>
                </StyledDoctorData>
                <StyledDoctorData>
                  <CustomButton
                    fullWidth
                    color="success"
                    onClick={() => {
                      window.location.href =
                        "http://localhost:5000/?room=Appointment_Session_1234";
                    }}
                  >
                    <span>Join Meeting</span>{" "}
                    <span style={{ float: "right" }}>
                      <VideoCallIcon
                        style={{ marginLeft: 8, verticalAlign: "middle" }}
                      />
                    </span>
                  </CustomButton>
                  <CustomButton
                    fullWidth
                    color="danger"
                    onClick={async () => {
                      const msg = await api.cancelAppointment(userData._id);
                      console.log(msg);
                    }}
                  >
                    Cancel Appointment{" "}
                    <CloseIcon
                      style={{ marginLeft: 8, verticalAlign: "middle" }}
                    />
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
