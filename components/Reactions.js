import React, {useState } from "react"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import tw from "twrnc";
import {View, Image, TouchableOpacity,Text,} from "react-native";


const Reactions = ({isVisible,onClose,containerStyle}) => {
  const [showReaction, setShowReaction] = useState(isVisible)
  const [reactions, setReactions] = useState([
    {id:3,reaction:require("../assets/bored.png"),rating:'15%'},
    {id:1,reaction:require("../assets/cool.png"),rating:'55%'},
    {id:2,reaction:require("../assets/party.png"),rating:'18%'},
        {id:4,reaction:require("../assets/lit.png"),rating:'30%'},
    ]);

  return (
    
  <View style={[tw`flex-row bg-white justify-center rounded-3xl p-3`,containerStyle]}>
      {reactions.map((reaction) => (
          <TouchableOpacity key={reaction.id} style={tw`flex-row items-center mx-4`} 
              onPress={()=> setShowReaction(!isVisible)}>
                <View style={tw`w-11 h-11`}>
              <Image
                style={tw`w-full h-full`}
                source={reaction.reaction}
              />
                </View>
            {/**  <Text style={tw`text-base`}>{reaction.rating}</Text>*/} 
        
            </TouchableOpacity>

      ))}
  </View>
  );
};

export default Reactions;
