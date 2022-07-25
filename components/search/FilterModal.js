import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
  Text,Image
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import DateTimePicker from '@react-native-community/datetimepicker';

import TwoPointSlider from "./TwoPointSlider";
import TextButton from "../TextButton";

const Section = ({ containerStyle, title, children }) => {
  return (
    <View style={[tw`my-3`, containerStyle]}>
      <Text style={tw`font-bold text-lg`}>{title}</Text>
      {children}
    </View>
  );
};

const FilterModal = ({ isVisible, onClose }) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  const [showFilterModal, setShowFilterModal] = useState(isVisible);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [dateValue, setDateValue] = useState('Select Date');
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([
    { id: 1, title: "Dinner" },
    { id: 2, title: "Conference" },
    { id: 3, title: "Party" },
    { id: 4, title: "Live Music" },
  ]);
  const [reactions, setReactions] = useState([
    {id:3,reaction:require("../../assets/bored.png"),rating:'15%'},
    {id:1,reaction:require("../../assets/cool.png"),rating:'55%'},
    {id:2,reaction:require("../../assets/party.png"),rating:'18%'},
    {id:4,reaction:require("../../assets/lit.png"),rating:'30%'},
]);


 
  const DatePicker = () => {
    setShow(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let dateValue = tempDate.toDateString();
    setDateValue(dateValue)
 
    
  };
  
  function renderDate() {
    return (
    <Section title="Date">
      {/*Date & Time*/}
      <View style={tw`p-3 flex-row justify-center`}>
        <View style={tw`flex-row items-center bg-gray-200 rounded-lg w-full p-2`}>
        <Text style={tw`flex-1 text-lg text-gray-800`}>{dateValue}</Text>
        <TouchableOpacity   onPress={DatePicker}>
          <Icon name='calendar' type='font-awesome-5' size={20}/>
        </TouchableOpacity>
        </View>

         {/*Picker*/}
        <View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
    </View>
      </Section>
    );
  }

  function renderDistance() {
    return (
      <Section title="Distance">
        <View style={tw`items-center p-2`}>
          <TwoPointSlider
            values={[3, 10]}
            min={1}
            max={20}
            postfix="km"
            onValuesChange={(values) => console.log(values)}
          />
        </View>
      </Section>
    );
  }

  function renderReactions() {
    return(

    <Section title="Reactions">
      <View style={tw`flex-row justify-center p-2`}>
      {reactions.map((reaction) => (
          <TouchableOpacity key={reaction.id} style={tw`flex-row items-center mx-4 
           w-11 h-11`}>
              <Image
                style={tw`w-full h-full`}
                source={reaction.reaction}
              />
        
            </TouchableOpacity>

))}
  </View>
      </Section>
    );
  }

  function renderCategory() {
    return (
      <Section title="Category">
        <View style={tw`flex-row flex-wrap`}>
          {categories.map((item, index) => {
            return (
              <TextButton
                key={`cat-${index}`}
                label={item.title}
                labelStyle={{color:item.id == category ? "#fdcc97" : "#6b7280" }}
                buttonContainerStyle={[tw`h-12 items-center m-3 p-2 rounded-lg`,
                {backgroundColor:item.id == category ? "#151618" : "#e5e7eb" }
              ]}
                 
                onPress={() => setCategory(item.id)}
              />
            );
          })}
        </View>
      </Section>
    );
  }

  function renderLocation() {
    return <Section title="Near">
       <View style={tw`flex-row items-center bg-gray-200 mx-2 my-1 p-2 rounded-lg`} >
        <TouchableOpacity>
          <Icon name='map-marker-alt' type='font-awesome-5' size={20}/>
        </TouchableOpacity>

        <TextInput  style={tw`flex-1 text-lg mx-3`} placeholder='Cantoments,Accra'/>
      </View>
      </Section>;
  }

  useEffect(() => {
    if (showFilterModal) {
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
  }, [showFilterModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [550, 100],
  });

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={tw`flex-1 bg-black bg-opacity-60`}>
        <TouchableWithoutFeedback onPress={() => setShowFilterModal(false)}>
          <View style={tw`absolute bottom-0 top-0 left-0 right-0 `} />
        </TouchableWithoutFeedback>
      </View>
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          top: modalY,
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          padding:20
        }}
      >
        {/**Header */}
        <View style={tw`flex-row items-center pb-5`}>
          <Text style={tw`flex-1 font-bold text-xl`}>Filter Search</Text>
          <TouchableOpacity
            style={tw`rounded-lg`}
            onPress={() => setShowFilterModal(false)}
          >
            <Icon type="font-awesome-5" name="times" size={20} color="gray" />
          </TouchableOpacity>
        </View>
        {/** */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-52`}>
          {/**Location */}
          {renderLocation()}

          {/**Date */}
          {renderDate()}

          {/**Reactions */}
          {renderReactions()}

          {/**Distance */}
          {renderDistance()}

          {/**Category */}
          {renderCategory()}
        </ScrollView>

        {/**Button */}
        <View style={tw`absolute h-24 bottom-20 left-0 right-0 p-5 bg-white`}>
      <TextButton label='Apply' buttonContainerStyle={tw`h-12 rounded`} />
        </View>
      </Animated.View>
    </Modal>
  );
};

export default FilterModal;
