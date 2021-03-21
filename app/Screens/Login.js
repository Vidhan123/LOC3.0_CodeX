import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import WavyHeader from "../Components/WavyHeader";
import { useNavigation } from "@react-navigation/native";
import { PRIMARY } from "../util/colors";
import api from "../util/api";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nameKey = "";
  return (
    <View style={styles.container}>
      <WavyHeader customStyles={styles.svgCurve} />
      <View style={{ marginTop: 150, marginHorizontal: 50 }}>
        <Text style={{ fontSize: 30, color: "white" }}>Welcome</Text>
        <Text style={{ fontSize: 30, color: "white" }}>Back</Text>
        <Text style={{ color: "white" }}>Please sign in to continue</Text>
      </View>
      <View style={{ marginTop: 150, marginHorizontal: 50 }}>
        <View>
          <TextInput
            placeholder="Email"
            style={{
              borderBottomWidth: 0.5,
              paddingVertical: 3,
              fontSize: 20,
              borderBottomColor: "grey",
            }}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={{
              borderBottomWidth: 0.5,
              paddingVertical: 3,
              fontSize: 20,
              borderBottomColor: "grey",
              marginVertical: 20,
            }}
          />
          <Text style={{ textAlign: "center", color: "grey", fontSize: 15 }}>
            Forgot your password?
          </Text>
        </View>
        <View
          style={{
            marginTop: 30,
            borderWidth: 1,
            borderRadius: 25,
            marginHorizontal: 10,
            backgroundColor: PRIMARY,
            borderColor: PRIMARY,
            padding: 8,
          }}
        >
          <TouchableOpacity
            onPress={async () => {
              if (email == "" || password == "") {
                Alert.alert("Error", "Please fill both the fields", [
                  {
                    text: "Okay",
                  },
                ]);
              } else {
                const data = await api.authUser(email, password);
                // console.log(data.image);
                if (data.email) {
                  navigation.navigate("Dashboard");
                  try {
                    await AsyncStorage.setItem("nameKey", data.name);
                    await AsyncStorage.setItem("id", data._id);
                  } catch (error) {
                    alert(error);
                  }
                }
              }
            }}
          >
            <Text style={{ fontSize: 25, textAlign: "center", color: "white" }}>
              Signin
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ textAlign: "center", color: "grey", fontSize: 15 }}>
            Don't have an account?{" "}
            <Text
              style={{
                color: PRIMARY,
                fontSize: 15,
              }}
              onPress={() => {
                navigation.navigate("Signup");
              }}
            >
              {" "}
              Signup
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  svgCurve: {
    position: "absolute",
    width: Dimensions.get("window").width,
  },
});
