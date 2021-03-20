import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button as ButtonRP } from "react-native-paper";
import { Button, NavBar } from "galio-framework";
import theme from "../Components/theme";
import { useNavigation } from "@react-navigation/core";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Avatar, Card } from "react-native-paper";
import docImg from "../assets/doctor.jpeg";
import { PRIMARY } from "../util/colors";
const BASE_SIZE = theme.SIZES.BASE;
const GRADIENT_BLUE = ["#6B84CA", "#8F44CE"];
const GRADIENT_PINK = ["#D442F8", "#B645F5", "#9B40F8"];
const COLOR_WHITE = theme.COLORS.WHITE;
const COLOR_GREY = theme.COLORS.MUTED;

const data = [
  {
    imgUrl: "../assets/doctor.jpeg",
    name: "DOC NAME 1",
    Specialization: "Specialization",
    Time: "",
    Date: "",
    Name: "",
  },
  {
    imgUrl: "../assets/doctor.jpeg",
    name: "DOC NAME 2",
    Specialization: "Specialization",
    Time: "2",
    Date: "",
    Name: "",
  },
  {
    imgUrl: "../assets/doctor.jpeg",
    name: "DOC NAME 3",
    Specialization: "Specialization",
    Time: "",
    Date: "",
    Name: "",
  },
  {
    imgUrl: "../assets/doctor.jpeg",
    name: "DOC NAME 4",
    Specialization: "Specialization",
    Time: "",
    Date: "",
    Name: "",
  },
];

const Scheduled = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 5 }}>
      <View style={{ marginTop: 40 }}>
        <NavBar
          title="Scheduled"
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
      <ScrollView style={{ flexDirection: "column" }}>
        <Card
          style={{
            position: "absolute",
            width: 350,
            marginTop: 80,
            marginHorizontal: 30,
            shadowOffset: { width: 10, height: 10 },
            elevation: 5,
          }}
        >
          <Card
            style={{
              margin: 15,
              height: 80,
              marginTop: -35,
              backgroundColor: PRIMARY,
              elevation: 5,
              shadowOffset: { width: 10, height: 10 },
              shadowOpacity: 0.3,
              borderRadius: 6,
            }}
          >
            <Text style={{ padding: 7, fontSize: 20, color: "white" }}>
              Appointments
            </Text>
            <Text style={{ padding: 7, fontSize: 15, color: "white" }}>
              Click on Join Meeting to continue
            </Text>
          </Card>
          <Card.Content>
            <FlatList
              bounces={false}
              data={data}
              renderItem={(itemData) => {
                return (
                  <View
                    style={{
                      borderBottomWidth: 0.5,
                      paddingVertical: 6,
                      borderBottomColor: "grey",
                    }}
                  >
                    <View
                      style={{
                        marginVertical: 20,
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={require("../assets/doctor.jpeg")}
                        style={{
                          width: 150,
                          height: 150,
                          borderRadius: 100,
                          borderColor: PRIMARY,
                        }}
                      />
                      <View style={{ marginTop: 10 }}>
                        <Text
                          style={{
                            fontSize: 20,
                            textAlign: "center",
                            color: "#757575",
                          }}
                        >
                          {itemData.item.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 20,
                            textAlign: "center",
                            color: "#bdbdbd",
                          }}
                        >
                          {itemData.item.Specialization}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 20,
                          marginTop: 20,
                          textAlign: "center",
                          color: "#757575",
                        }}
                      >
                        APPOINTMENT SUMMARY
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginHorizontal: 40,
                      }}
                    >
                      <Text style={{ fontSize: 25, color: "#757575" }}>
                        Time:
                      </Text>
                      <Text style={{ fontSize: 25, color: "#757575" }}>
                        {itemData.item.Time}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginHorizontal: 40,
                      }}
                    >
                      <Text style={{ fontSize: 25, color: "#757575" }}>
                        Date:
                      </Text>
                      <Text style={{ fontSize: 25, color: "#757575" }}>
                        {itemData.item.Date}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginHorizontal: 40,
                      }}
                    >
                      <Text style={{ fontSize: 25, color: "#757575" }}>
                        Name:
                      </Text>
                      <Text style={{ fontSize: 25, color: "#757575" }}>
                        {itemData.item.Name}
                      </Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                      <ButtonRP
                        icon="video"
                        style={{
                          backgroundColor: "#4caf50",
                          marginHorizontal: 20,
                        }}
                        labelStyle={{ fontSize: 17 }}
                        mode="contained"
                      >
                        join meeting
                      </ButtonRP>
                      <ButtonRP
                        icon="close"
                        style={{
                          backgroundColor: "#ef5350",
                          marginHorizontal: 20,
                          marginVertical: 5,
                        }}
                        labelStyle={{ fontSize: 17 }}
                        mode="contained"
                      >
                        cancel appointment
                      </ButtonRP>
                    </View>
                  </View>
                );
              }}
            />
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

export default Scheduled;

const styles = StyleSheet.create({
  settings: {
    width: BASE_SIZE * 2,
    borderColor: "transparent",
  },
});
