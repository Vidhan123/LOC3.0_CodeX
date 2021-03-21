import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Text,
  SafeAreaView,
  Dimensions,
} from "react-native";

import { useNavigation } from "@react-navigation/core";
import { Card } from "react-native-paper";
import { PRIMARY, YELLOW } from "../util/colors";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import theme from "../Components/theme";
import { Button, NavBar } from "galio-framework";
import api from "../util/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
const BASE_SIZE = theme.SIZES.BASE;
const GRADIENT_BLUE = ["#6B84CA", "#8F44CE"];
const GRADIENT_PINK = ["#D442F8", "#B645F5", "#9B40F8"];
const COLOR_WHITE = theme.COLORS.WHITE;
const COLOR_GREY = theme.COLORS.MUTED;

const ProfileData = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [sex, setSex] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");
  let id;
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("id");
        id = value;
        setData(await api.getUserById(value));
      } catch (error) {
        alert(error);
      }
    };
    getData();
  }, []);
  return (
    <View>
      <View style={{ marginTop: 40 }}>
        <NavBar
          title="User Profile"
          titleStyle={{ fontSize: 20 }}
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
      <SafeAreaView>
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
              Edit Profile
            </Text>
            <Text style={{ padding: 7, fontSize: 15, color: "white" }}>
              Update your Profile
            </Text>
          </Card>
          <View style={{ padding: 20 }}>
            <TextInput
              placeholder="Name"
              style={{
                borderBottomWidth: 0.3,
                padding: 5,
                fontSize: 20,
                marginVertical: 20,
              }}
              value={data.name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              placeholder="Phone Number"
              style={{
                borderBottomWidth: 0.3,
                padding: 5,
                fontSize: 20,
                marginVertical: 20,
              }}
              value={data.phoneNo}
              onChangeText={(text) => setPhoneNo(text)}
            />
            <TextInput
              placeholder="Email Address"
              style={{
                borderBottomWidth: 0.3,
                padding: 5,
                fontSize: 20,
                marginVertical: 20,
              }}
              value={data.email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              placeholder="Age"
              style={{
                borderBottomWidth: 0.3,
                padding: 5,
                fontSize: 20,
                marginVertical: 20,
              }}
              value={data.age}
              onChangeText={(text) => setAge(text)}
            />
            <TextInput
              placeholder="Sex"
              style={{
                borderBottomWidth: 0.3,
                padding: 5,
                fontSize: 20,
                marginVertical: 20,
              }}
              value={data.sex}
              onChangeText={(text) => setSex(text)}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              style={{
                borderBottomWidth: 0.3,
                padding: 5,
                fontSize: 20,
                marginVertical: 20,
              }}
              value={data.password}
              onChangeText={(text) => setPassword(text)}
            />
            <TextInput
              placeholder="About"
              style={{
                borderBottomWidth: 0.3,
                padding: 5,
                fontSize: 20,
                marginVertical: 20,
              }}
              value={data.about}
              onChangeText={(text) => setAbout(text)}
            />
            <TouchableOpacity
              onPress={async () => {
                // await api.updateUserProfile(
                //   id,
                //   name,
                //   phoneNo,
                //   email,
                //   password,
                //   sex,
                //   age,
                //   about
                // );
              }}
            >
              <Button color={PRIMARY} uppercase>
                Update Profile
              </Button>
            </TouchableOpacity>
          </View>
        </Card>
      </SafeAreaView>
    </View>
  );
};
const Update = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Card
        style={{
          margin: 35,
          borderRadius: 10,
          shadowOpacity: 0.26,
          shadowOffset: { width: 10, height: 10 },
          elevation: 5,
          position: "absolute",
          marginTop: 870,
          width: 350,
        }}
      >
        <Image
          source={require("../assets/bg.jpeg")}
          style={{
            width: 130,
            height: 130,
            marginTop: -45,
            marginHorizontal: "30%",
            borderRadius: 65,
          }}
        />
        <View style={{ margin: 80 }}>
          <Text style={{ fontSize: 30, textAlign: "center" }}>Tanay Naik</Text>
        </View>
      </Card>
    </View>
  );
};
const Profile = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 5 }}>
        <ProfileData />
        <Update />
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  settings: {
    width: BASE_SIZE * 2,
    borderColor: "transparent",
  },
});
