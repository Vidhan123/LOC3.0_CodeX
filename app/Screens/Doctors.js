import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Platform, View, TextInput } from "react-native";

import { Ionicons } from "@expo/vector-icons";

// galio components
import { Button as ButtonRP } from "react-native-paper";
import { Button, NavBar } from "galio-framework";
import theme from "../Components/theme";
import { useNavigation } from "@react-navigation/core";
import { Card } from "react-native-paper";
import { PRIMARY } from "../util/colors";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import api from "../util/api";

const BASE_SIZE = theme.SIZES.BASE;
const GRADIENT_BLUE = ["#6B84CA", "#8F44CE"];
const GRADIENT_PINK = ["#D442F8", "#B645F5", "#9B40F8"];
const COLOR_WHITE = theme.COLORS.WHITE;
const COLOR_GREY = theme.COLORS.MUTED;

const Doctors = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [doctorData, setDoctorData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      setDoctorData(await api.getDoctors());
      // console.log(doctorData);
    };
    getData();
  }, []);
  // console.log(doctorData.length);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 40 }}>
        <NavBar
          title="Doctors"
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
      <View>
        <Card
          style={{
            margin: 35,
            borderRadius: 10,
            shadowOpacity: 0.26,
            shadowOffset: { width: 10, height: 10 },
            elevation: 5,
            position: "absolute",
            marginTop: 50,
            width: 350,
          }}
        >
          <Card
            style={{
              margin: 20,
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
              Doctors
            </Text>
            <Text
              style={{
                padding: 5,
                fontSize: 15,
                color: "white",
              }}
            >
              Find the best doctor and medical assistants{" "}
              <Text style={{ fontWeight: "bold" }}>nearest to you</Text>
            </Text>
          </Card>
          <Card.Content>
            <View style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 20 }}>Search as per need...</Text>
            </View>
            <View style={{ marginVertical: 30 }}>
              <TextInput
                placeholder="Search by name"
                style={{
                  marginVertical: 40,
                  fontSize: 20,
                  borderBottomWidth: 0.5,
                  paddingVertical: 5,
                }}
                value={name}
                onChangeText={(text) => setName(text)}
              />
              <TextInput
                placeholder="Search by specialization"
                style={{
                  fontSize: 20,
                  borderBottomWidth: 0.5,
                  paddingVertical: 5,
                }}
                value={specialization}
                onChangeText={(text) => setSpecialization(text)}
              />
            </View>
            <ButtonRP
              mode="contained"
              color={PRIMARY}
              labelStyle={{ color: "white", fontSize: 17 }}
              style={{
                shadowOpacity: 0.3,
                shadowOffset: { width: 5, height: 5 },
                elevation: 5,
              }}
              onPress={async () => {
                await api.searchDoctorByName(name);
                await api.searchDoctorBySpecialization(specialization);
              }}
            >
              Apply Filter
            </ButtonRP>
          </Card.Content>
        </Card>
      </View>
      {doctorData.length != 0 ? (
        <FlatList
          horizontal
          data={doctorData}
          renderItem={(itemData) => {
            return (
              <View style={{ marginTop: 450, paddingHorizontal: 200 }}>
                <Card
                  style={{
                    margin: 35,
                    borderRadius: 10,
                    shadowOpacity: 0.26,
                    shadowOffset: { width: 10, height: 10 },
                    elevation: 5,
                    position: "absolute",
                    width: 350,
                  }}
                >
                  <Card
                    style={{
                      margin: 20,
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
                      {itemData.item.name}
                    </Text>
                  </Card>
                  <Card.Content>
                    <View
                      style={{
                        marginTop: 20,
                        borderBottomWidth: 0.5,
                        paddingVertical: 8,
                        borderBottomColor: "grey",
                      }}
                    >
                      <Text style={{ fontSize: 20, marginVertical: 3 }}>
                        {itemData.item.specialization}
                      </Text>
                      <Text style={{ fontSize: 20, marginVertical: 3 }}>
                        {itemData.item.sex}
                      </Text>
                      <Text style={{ fontSize: 20 }}>{itemData.item.age}</Text>
                    </View>

                    <ButtonRP
                      mode="contained"
                      color={PRIMARY}
                      labelStyle={{ color: "white", fontSize: 17 }}
                      style={{
                        shadowOpacity: 0.3,
                        shadowOffset: { width: 5, height: 5 },
                        elevation: 5,
                        marginVertical: 10,
                      }}
                      onPress={() => {
                        navigation.navigate("BookAppointments", {
                          name: itemData.item.name,
                          specialization: itemData.item.specialization,
                          age: itemData.item.age,
                          sex: itemData.item.sex,
                          about: itemData.item.about,
                          id: itemData.item._id,
                        });
                      }}
                    >
                      Book an appointment
                    </ButtonRP>
                  </Card.Content>
                </Card>
              </View>
            );
          }}
        />
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default Doctors;

const styles = StyleSheet.create({
  settings: {
    width: BASE_SIZE * 2,
    borderColor: "transparent",
  },
});
