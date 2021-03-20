import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { PRIMARY } from "../util/colors";

const WavyHeader = ({ customStyles }) => {
  return (
    <View style={customStyles}>
      <View style={{ backgroundColor: PRIMARY, height: 250 }}>
        <Svg
          height="90%"
          width="100%"
          viewBox="0 0 1440 320"
          style={{ position: "absolute", top: 183 }}
        >
          <Path
            fill={PRIMARY}
            d="M0,0L80,37.3C160,75,320,149,480,192C640,235,800,245,960,218.7C1120,192,1280,128,1360,96L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </Svg>
      </View>
    </View>
  );
};

export default WavyHeader;

const styles = StyleSheet.create({});
