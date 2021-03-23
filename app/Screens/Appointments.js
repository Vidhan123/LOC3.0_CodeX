import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, FlatList } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-paper";
import theme from "../Components/theme";
import { Button, NavBar } from "galio-framework";
const BASE_SIZE = theme.SIZES.BASE;
import api from "../util/api";

const Appointments = () => {
  const navigation = useNavigation();
  const NUM_OF_LINES = 3;
  // const data = [
  //   { ID: "1", Name: "Dr. Verma", Date: "Sat 20 Mar", Status: "Pending" },
  //   { ID: "2", Name: "Dr. Verma", Date: "Sat 20 Mar", Status: "Pending" },
  //   { ID: "3", Name: "Dr. Verma", Date: "Sat 20 Mar", Status: "Pending" },
  //   { ID: "4", Name: "Dr. Verma", Date: "Sat 20 Mar", Status: "Pending" },
  // ];
  const [uApp, setUpp] = useState([]);

  const [pApp, setPpp] = useState([]);
  console.log(uApp);
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
            ID: `${j}`,
            Name: data[i].doctorId.name,
            Date: data[i].date,
            Status: "Pending",
          });
          j++;
        } else {
          ppp.push({
            ID: `${k}`,
            Name: data[i].doctorId.name,
            Date: data[i].date,
            Status: data[i].status,
          });
          k++;
        }
      }
      setUpp(upp);
      setPpp(ppp);
    };
    mf();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 40 }}>
        <NavBar
          title="Appointments"
          titleStyle={{ fontSize: 20 }}
          //   onLeftPress={() => this.props.navigation.openDrawer()}
          //   leftIconColor={theme.COLORS.MUTED}
          left={
            <Button
              color="transparent"
              style={styles.settings}
              onPress={() => navigation.openDrawer()}
            >
              <Ionicons size={30} name="md-menu" color={theme.COLORS.MUTED} />
            </Button>
          }
          style={
            Platform.OS === "android" ? { marginTop: theme.SIZES.BASE } : null
          }
        />
      </View>
      {/* <FlatList
        data={data}
        renderItem={()=>{
          return(
            
          )
        }}    
        /> */}
      <ScrollView>
        <Card
          style={{
            position: "absolute",
            marginTop: 50,
            width: 400,
            margin: 7,
            height: "auto",
            elevation: 5,
            shadowOffset: { width: 10, height: 10 },
            shadowOpacity: 0.3,
            borderRadius: 6,
          }}
        >
          <Card
            style={{
              margin: 15,
              height: 80,
              marginTop: -35,
              backgroundColor: "#7b1fa2",
              elevation: 5,
              shadowOffset: { width: 10, height: 10 },
              shadowOpacity: 0.3,
              borderRadius: 6,
            }}
          >
            <Text style={{ padding: 7, fontSize: 20, color: "white" }}>
              Upcoming Appointments
            </Text>
            <Text style={{ padding: 7, fontSize: 15, color: "white" }}>
              Here is a list of your upcoming appointments
            </Text>
          </Card>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottomWidth: 0.3,
              marginHorizontal: 10,
              paddingVertical: 3,
              borderBottomColor: "grey",
            }}
          >
            <Text style={{ fontSize: 20, color: "#7b1fa2" }}>ID</Text>
            <Text style={{ fontSize: 20, color: "#7b1fa2" }}>Dr. Name</Text>
            <Text style={{ fontSize: 20, color: "#7b1fa2" }}>Date/Time</Text>
            <Text style={{ fontSize: 20, color: "#7b1fa2" }}>Status</Text>
          </View>
          {/* <FlatList
            data={uApp}
            renderItem={(itemData) => {
              return ( */}
          <View>
            <FlatList
              data={uApp}
              renderItem={(itemData) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottomWidth: 0.5,
                      paddingHorizontal: 5,
                      paddingVertical: 30,
                      marginHorizontal: 10,
                      borderBottomColor: "grey",
                    }}
                  >
                    <Text style={{ fontSize: 15, textAlign: "left" }}>
                      {itemData.item.ID}
                    </Text>

                    <Text style={{ fontSize: 15 }}>
                      {itemData.item.Name.split(" ")[0]}
                    </Text>

                    <Text
                      style={{
                        fontSize: 15,
                        textAlign: "left",
                        paddingRight: -5,
                        marginHorizontal: 10,
                      }}
                    >
                      {itemData.item.Date.split("T")[0]}
                    </Text>

                    <Text style={{ textAlign: "center", fontSize: 15 }}>
                      {itemData.item.Status}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
          {/* );
            }}
          /> */}
        </Card>

        <Card
          style={{
            position: "absolute",
            marginVertical: 470,
            width: 400,
            margin: 7,
            height: "auto",
            elevation: 5,
            shadowOffset: { width: 10, height: 10 },
            shadowOpacity: 0.3,
            borderRadius: 6,
          }}
        >
          <Card
            style={{
              margin: 15,
              height: 80,
              marginTop: -35,
              backgroundColor: "#7b1fa2",
              elevation: 5,
              shadowOffset: { width: 10, height: 10 },
              shadowOpacity: 0.3,
              borderRadius: 6,
            }}
          >
            <Text style={{ padding: 7, fontSize: 20, color: "white" }}>
              Previous Appointments
            </Text>
            <Text style={{ padding: 7, fontSize: 15, color: "white" }}>
              Here is a list of your previous appointments
            </Text>
          </Card>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottomWidth: 0.3,
              marginHorizontal: 10,
              paddingVertical: 3,
              borderBottomColor: "grey",
            }}
          >
            <Text style={{ fontSize: 20, color: "#7b1fa2" }}>ID</Text>
            <Text style={{ fontSize: 20, color: "#7b1fa2" }}>Dr. Name</Text>
            <Text style={{ fontSize: 20, color: "#7b1fa2" }}>Date/Time</Text>
            <Text style={{ fontSize: 20, color: "#7b1fa2" }}>Status</Text>
          </View>
          <FlatList
            data={pApp}
            renderItem={(itemData) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottomWidth: 0.5,
                    paddingHorizontal: 5,
                    paddingVertical: 30,
                    marginHorizontal: 10,
                    borderBottomColor: "grey",
                  }}
                >
                  <Text style={{ fontSize: 15, textAlign: "left" }}>
                    {itemData.item.ID}
                  </Text>

                  <Text style={{ fontSize: 15 }}>
                    {itemData.item.Name.split(" ")[0]}
                  </Text>

                  <Text
                    style={{
                      fontSize: 15,
                      textAlign: "left",
                      paddingRight: -5,
                      marginHorizontal: 10,
                    }}
                  >
                    {itemData.item.Date.split("T")[0]}
                  </Text>

                  <Text style={{ textAlign: "center", fontSize: 15 }}>
                    {itemData.item.Status}
                  </Text>
                </View>
              );
            }}
          />
        </Card>
      </ScrollView>
    </View>
  );
};

export default Appointments;

const styles = StyleSheet.create({
  settings: {
    width: BASE_SIZE * 2,
    borderColor: "transparent",
  },
});
