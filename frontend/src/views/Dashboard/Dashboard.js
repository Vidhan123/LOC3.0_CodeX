import React, {useState, useEffect} from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import GroupIcon from '@material-ui/icons/Group';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import api from '../../utils/api';

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import globe from '../../assets/gifs/globe.gif';

const useStyles = makeStyles(styles);

export default function Dashboard() {
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
          upp.push([`${j}`, data[i].doctorId.name, Date(data[i].date)]);
          j++;
        }
        else {
          ppp.push([`${j}`, data[i].doctorId.name, Date(data[i].date), data[i].status]);
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
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <PersonIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Total Users</p>
              <h3 className={classes.cardTitle}>
                39
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
              <PersonAddIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Doctors Added</p>
              <h3 className={classes.cardTitle}>7</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <PersonAddIcon />
                Last 12 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
              <FormatListNumberedIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Total Appointments</p>
              <h3 className={classes.cardTitle}>26</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from CodeX
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <GroupIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Registered Doctors</p>
              <h3 className={classes.cardTitle}>18</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={5} style={{marginLeft: '2vw'}}>
        <GridItem xs={12} sm={12} md={12} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 40 }}>
          <img src={globe} width={100} height={100}/>
          <h4>Get connected with the World's<br/> best Doctors,<b> TODAY!</b></h4>
        </GridItem>
          <Card chart>
            <CardHeader color="info">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Weekly Appointment Status</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 18%
                </span>{" "}
                Appointments per day
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Updated a day ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6} style={{ marginTop: 55, marginLeft: '1vw' }}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Upcoming Appointments</h4>
              <p className={classes.cardCategoryWhite}>
                Never miss an appointment
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Doctor's Name", "When"]}
                tableData={uApp}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
