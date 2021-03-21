import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  Button as NormalBtn,
  Alert,
} from "react-native";
import { Card } from "react-native-paper";
import theme from "../Components/theme";
import { Ionicons } from "@expo/vector-icons";
import { Button, NavBar } from "galio-framework";
import { useNavigation } from "@react-navigation/native";
import { PRIMARY } from "../util/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

const BASE_SIZE = theme.SIZES.BASE;
const GRADIENT_BLUE = ["#6B84CA", "#8F44CE"];
const GRADIENT_PINK = ["#D442F8", "#B645F5", "#9B40F8"];
const COLOR_WHITE = theme.COLORS.WHITE;
const COLOR_GREY = theme.COLORS.MUTED;
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const BookAppointments = ({ route }) => {
  const { name, about, sex, specialization, age } = route.params;
  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        // console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };
  const showTimepicker = () => {
    showMode("time");
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 40 }}>
        <NavBar
          title="Appointment Booking"
          titleStyle={{ fontSize: 20 }}
          //   onLeftPress={() => this.props.navigation.openDrawer()}
          //   leftIconColor={theme.COLORS.MUTED}
          // left={
          //   // <Button
          //   //   color="transparent"
          //   //   style={styles.settings}
          //   //   onPress={() => navigation.openDrawer()}
          //   // >
          //   //   <Ionicons size={30} name="md-menu" color={theme.COLORS.MUTED} />
          //   // </Button>
          // }
          style={
            Platform.OS === "android" ? { marginTop: theme.SIZES.BASE } : null
          }
        />
      </View>
      <Card
        style={{
          margin: 35,
          borderRadius: 10,
          shadowOpacity: 0.26,
          shadowOffset: { width: 10, height: 10 },
          elevation: 5,
          marginTop: 50,
          width: 350,
        }}
      >
        <Card.Content>
          <View>
            <TextInput
              editable={false}
              placeholder={"Doctor Name:" + " " + name}
              style={{
                fontSize: 20,
                borderBottomWidth: 0.5,
                paddingVertical: 5,
                borderBottomColor: "grey",
                marginVertical: 15,
              }}
              placeholderTextColor="black"
            />
            <TextInput
              editable={false}
              placeholder={"Specialization:" + " " + specialization}
              style={{
                fontSize: 20,
                borderBottomWidth: 0.5,
                paddingVertical: 5,
                borderBottomColor: "grey",
                marginVertical: 15,
              }}
              placeholderTextColor="black"
            />
            <TextInput
              editable
              placeholder="Mention your illness"
              style={{
                fontSize: 20,
                borderBottomWidth: 0.5,
                paddingVertical: 5,
                borderBottomColor: "grey",
                marginVertical: 15,
              }}
              placeholderTextColor="grey"
            />
            <View>
              <View>
                <NormalBtn onPress={showDatepicker} title="Select Date" />
              </View>

              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="compact"
                  onChange={onChange}
                  minimumDate={new Date(Date.now())}
                  style={{ marginHorizontal: "30%" }}
                />
              )}
              <NormalBtn
                title="Book the appointment"
                onPress={async () => {
                  await sendPushNotification(expoPushToken);
                  navigation.goBack();
                }}
              />
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Appointment",
    body:
      "Your appointment has been successfully booked with Dr. XYZ on 20th March 2021 at 8:00 PM",
    data: { someData: "goes here" },
  };
  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export default BookAppointments;

const styles = StyleSheet.create({
  settings: {
    width: BASE_SIZE * 2,
    borderColor: "transparent",
  },
});
