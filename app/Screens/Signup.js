import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import axios from "axios";
import WavyHeader from "../Components/WavyHeader";
import { useNavigation } from "@react-navigation/native";
import { PRIMARY } from "../util/colors";
import api from "../util/api";

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const rolelc = role.toLowerCase();
  return (
    <View style={styles.container}>
      <WavyHeader customStyles={styles.svgCurve} />
      <View style={{ marginTop: 150, marginHorizontal: 50 }}>
        <Text style={{ fontSize: 30, color: "white" }}>Create</Text>
        <Text style={{ fontSize: 30, color: "white" }}>Account</Text>
        <Text style={{ color: "white" }}>Please sign up to continue</Text>
      </View>
      <KeyboardAvoidingView
        behavior="position"
        style={{ marginTop: 150, marginHorizontal: 50 }}
      >
        <TextInput
          placeholder="Full Name"
          style={{
            borderBottomWidth: 0.5,
            paddingVertical: 3,
            fontSize: 20,
            borderBottomColor: "grey",
            marginVertical: 15,
          }}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={{
            borderBottomWidth: 0.5,
            paddingVertical: 3,
            fontSize: 20,
            borderBottomColor: "grey",
            marginVertical: 15,
          }}
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={{
            borderBottomWidth: 0.5,
            paddingVertical: 3,
            fontSize: 20,
            borderBottomColor: "grey",
            marginVertical: 15,
          }}
        />
        <TextInput
          placeholder="Role"
          value={role}
          onChangeText={(text) => setRole(text)}
          style={{
            borderBottomWidth: 0.5,
            paddingVertical: 3,
            fontSize: 20,
            borderBottomColor: "grey",
            marginVertical: 15,
          }}
        />

        <View
          style={{
            marginTop: 30,
            borderWidth: 1,
            borderRadius: 25,
            marginHorizontal: 10,
            backgroundColor: PRIMARY,
            borderColor: PRIMARY,
            padding: 8,
            // shadowOffset: { width: 7, height: 7 },
            // shadowOpacity: 0.5,
            // shadowColor: "#F1C40F",
          }}
        >
          <TouchableOpacity
            onPress={async () => {
              if (name == "" || email == "" || mobNo == "" || password == "") {
                Alert.alert("Error", "Please fill all the fields", [
                  {
                    text: "Okay",
                  },
                ]);
              } else {
                const data = await api.registerUser(
                  name,

                  email,
                  password,

                  rolelc
                );
                if (data.email) {
                  navigation.navigate("Login");
                }
              }
            }}
          >
            <Text style={{ fontSize: 25, textAlign: "center", color: "white" }}>
              Signup
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ textAlign: "center", color: "grey", fontSize: 15 }}>
            Already have an account?{" "}
            <Text
              style={{
                color: PRIMARY,
                fontSize: 15,
              }}
              onPress={async () => {
                navigation.navigate("Login");
              }}
            >
              {" "}
              Signin
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Signup;

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
