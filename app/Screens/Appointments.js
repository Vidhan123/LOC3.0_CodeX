import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text, ScrollView, FlatList } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-paper";
import theme from "../Components/theme";
import { Button, NavBar } from "galio-framework";
const BASE_SIZE = theme.SIZES.BASE;
const GRADIENT_BLUE = ["#6B84CA", "#8F44CE"];
const GRADIENT_PINK = ["#D442F8", "#B645F5", "#9B40F8"];
const COLOR_WHITE = theme.COLORS.WHITE;
const COLOR_GREY = theme.COLORS.MUTED; // '#D8DDE1';

const Appointments = () => {
  const navigation = useNavigation();
  const NUM_OF_LINES = 3;
  const data = [
    { ID: "1", Name: "Dr. Verma", Date: "Sat 20 Mar", Status: "Pending" },
    { ID: "2", Name: "Dr. Verma", Date: "Sat 20 Mar", Status: "Pending" },
    { ID: "3", Name: "Dr. Verma", Date: "Sat 20 Mar", Status: "Pending" },
    { ID: "4", Name: "Dr. Verma", Date: "Sat 20 Mar", Status: "Pending" },
  ];
  const [showMore, setShowMore] = useState(false);

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
            height: 500,
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
            <Text style={{ fontSize: 20, color: "#7b1fa2" }}>
              Doctor's Name
            </Text>
            <Text style={{ fontSize: 20, color: "#7b1fa2" }}>Date/Time</Text>
            <Text style={{ fontSize: 20, color: "#7b1fa2" }}>Status</Text>
          </View>
          <FlatList
            data={data}
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

                  <Text style={{ fontSize: 15 }}>{itemData.item.Name}</Text>

                  <Text
                    style={{
                      fontSize: 15,
                      textAlign: "center",
                      paddingLeft: 50,
                    }}
                  >
                    {itemData.item.Date}
                  </Text>

                  <Text style={{ textAlign: "center", fontSize: 15 }}>
                    {itemData.item.Status}
                  </Text>
                </View>
              );
            }}
          />
        </Card>

        <Card
          style={{
            position: "absolute",
            marginVertical: 600,
            width: 400,
            margin: 7,
            height: 500,
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
            <Text style={{ fontSize: 20, color: "#7b1fa2" }}>
              Doctor's Name
            </Text>
            <Text style={{ fontSize: 20, color: "#7b1fa2" }}>Date/Time</Text>
            <Text style={{ fontSize: 20, color: "#7b1fa2" }}>Status</Text>
          </View>
          <FlatList
            data={data}
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

                  <Text style={{ fontSize: 15 }}>{itemData.item.Name}</Text>

                  <Text
                    style={{
                      fontSize: 15,
                      textAlign: "center",
                      paddingLeft: 50,
                    }}
                  >
                    {itemData.item.Date}
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
