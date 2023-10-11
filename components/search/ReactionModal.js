import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Text,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "twrnc";

import TextButton from "../buttons/TextButton";

const ReactionModal = ({ isVisible, onClose }) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  const [showReactionModal, setShowReactionModal] = useState(isVisible);
  const [reactions, setReactions] = useState([
    { id: 3, reaction: require("../../assets/bored.png"), rating: "15%" },
    { id: 1, reaction: require("../../assets/cool.png"), rating: "55%" },
    { id: 2, reaction: require("../../assets/party.png"), rating: "18%" },
    { id: 4, reaction: require("../../assets/lit.png"), rating: "30%" },
  ]);

  function renderReactions() {
    return (
      <View style={tw`flex-row justify-center bg-white shadow-xl rounded-full`}>
        {reactions.map((reaction) => (
          <TouchableOpacity
            key={reaction.id}
            style={[
              tw`flex-row justify-between items-center 
               h-16 mx-1`,
              { width: 70 },
            ]}
          >
            <Image style={tw`w-10 h-10`} source={reaction.reaction} />
            <Text style={tw`text-base`}>{reaction.rating}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  useEffect(() => {
    if (showReactionModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showReactionModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 4.5],
    outputRange: [650, 100],
  });

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <TouchableWithoutFeedback onPress={() => setShowReactionModal(false)}>
        <View style={tw`absolute bottom-0 top-0 left-0 right-0`} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          tw`w-full h-28 p-2`,
          {
            //  height:"50%",
            top: modalY,
            //  borderTopRightRadius: 20,
            //  borderTopLeftRadius: 20,
          },
        ]}
      >
        {/**Reactions */}
        {renderReactions()}
      </Animated.View>
    </Modal>
  );
};

export default ReactionModal;
