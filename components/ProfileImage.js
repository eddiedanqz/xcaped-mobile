import React, { Fragment, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
  Input,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const uploadIcon = require("../assets/banner-placeholder.png");
//const { uri: uploadIconUrl } = RNIImage.resolveAssetSource(uploadIcon)

const InputField = ({ url, onPress }) => {

  return (
    <Fragment>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          tw`justify-center items-center rounded w-full h-52 
      `,
          // { borderStyle: "dashed", borderRadius: 1, borderWidth: 1,borderColor:'gray' },
        ]}
        onPress={onPress}
      >
        
          <Image
            source={(url)? { uri: url } : uploadIcon}
            resizeMode="stretch"
            style={tw`w-full h-full rounded-xl`}
          />
         
      </TouchableOpacity>
    </Fragment>
  );
};

export default InputField;

const BG_COLOR = "rgba(240, 242, 245, 1)";
const BORDER_COLOR = "rgba(22, 42, 76, 0.7)";
const FOCUSED_COLOR = "rgba(55, 107, 251, 1)";
const ICON_SIZE = 50;

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    backgroundColor: BG_COLOR,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 120,
    justifyContent: "center",
    overflow: "hidden",
    width: "100%",
  },
  focused: { borderBottomColor: FOCUSED_COLOR, borderBottomWidth: 3 },
  input: {
    backgroundColor: BG_COLOR,
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 2,
    height: 32,
    paddingHorizontal: 5,
    width: "100%",
  },
  uploadIcon: { height: ICON_SIZE, width: ICON_SIZE },
});
