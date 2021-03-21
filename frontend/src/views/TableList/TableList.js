import React, { useState, useEffect, useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import {GlobalContext} from "../../GlobalContext";
import api from "../../utils/api";

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

export default function TableList() {
  const { user } = useContext(GlobalContext);
  const [ userData, setUserData ] = user;

  const [uApp, setUpp] = useState([]);

  const [pApp, setPpp] = useState([]);

  useEffect(() => {
    const mf = async() => {
      const data = await api.getAllAppointments("6056c3a829eca020d81bbb53");
      console.log(data);
      let j=1,k=1;
      let upp = [], ppp = [];
      for(let i=0;i<data.length;i++) {
        if(i<2 || i>3) {
          upp.push([`${j}`, data[i].doctorId.name, Date(data[i].date), "Pending"]);
          j++;
        }
        else {
          ppp.push([`${k}`, data[i].doctorId.name, Date(data[i].date), data[i].status]);
          k++;
        }
      }
      setUpp(upp);
      setPpp(ppp);
    }
    mf();
  }, [])

  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Upcoming Appointments</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a list of your upcoming appointments
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="info"
              tableHead={["ID", "Doctor's Name", "Date/Time", "Status"]}
              tableData={uApp}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
      <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Previous Appointments</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a list of your previous appointments
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="info"
              tableHead={["ID", "Doctor's Name", "Date/Time", "Status"]}
              tableData={pApp}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
