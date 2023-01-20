
import React, {useState,useEffect,useRef } from "react";
import {
  View,
  Modal,
  Text,
  Animated,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { Icon} from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import DateTimePicker from "@react-native-community/datetimepicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Section from "../content/Section";
import TextButton from "../buttons/TextButton";

const AddTicket = ({isVisible,onClose,addTicket}) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  const [showModal, setShowModal] = useState(isVisible);
  const [tickets, setTickets] = useState([]); 
  const [numInputs, setNumInputs] = useState(1);
  const [isAlert, setAlert] = useState(false);
  // all our input fields are tracked with this array
  const refInputs = useRef([{title:'',price:'',capacity:''}]);

    const setValue = (index,value,field) => {
        refInputs.current[index][field] = value
    // console.log(inputs[index])
    setTickets(refInputs.current)
    }

    const addInput = () => {
        refInputs.current.push({title:'',price:'',capacity:''})
        setNumInputs(value => value +1)  
    }

    const removeForm = (i) =>{
        refInputs.current.splice(i,1)[0]
        setNumInputs(value => value -1) 
    };
   
    const form =[];

    for (let i = 0; i < numInputs; i++) {
      form.push(
        <Section containerStyle={tw`mb-4`} key={i}>
            {/**remove */}
        <View style={tw`absolute right-3 -top-1 flex-row items-center justify-end mr-5 z-20 rounded-lg`} >
        <TouchableOpacity style={[tw`items-center justify-center p-1`,{}]} onPress={() => removeForm(i)}>
            <Icon name="minus" type="feather" size={20} color="red"/>
        </TouchableOpacity>
       </View>
            {/**Ticket Type */}
        <View style={tw`flex-row items-center border-b border-gray-400 mx-3 my-1 p-2 rounded-lg`} >
         <TouchableOpacity>
           <Icon name='ticket' type='font-awesome' size={20}/>
         </TouchableOpacity>
 
         <TextInput  style={tw`flex-1 text-lg mx-3`} placeholder='Type*' placeholderTextColor='gray'
         keyboardType="default" onChangeText={value => setValue(i,value,'title')} 
         />
       </View>
       {/**Ticket Price */}
       <View style={tw`flex-row items-center border-b border-gray-400 mx-3 my-1 p-2 rounded-lg`} >
         <TouchableOpacity>
           <Icon name='dollar-sign' type='feather' size={20}/>
         </TouchableOpacity>
 
         <TextInput  style={tw`flex-1 text-lg mx-3`} placeholder='Price*' placeholderTextColor='gray'
         keyboardType="numeric" onChangeText={value => setValue(i,value,'price')}/>
       </View>
        {/**Ticket Type */}
        <View style={tw`flex-row items-center border-b border-gray-400 mx-3 my-1 p-2 rounded-lg`} >
         <TouchableOpacity>
           <Icon name='thermometer' type='feather' size={20}/>
         </TouchableOpacity>
 
         <TextInput  style={tw`flex-1 text-lg mx-3`} placeholder='Number of tickets*(capacity)' placeholderTextColor='gray'
         keyboardType="numeric" onChangeText={value => setValue(i,value,'capacity')}/>
       </View>
       </Section>
         
         )
        
    }

    const validate = () => {
   tickets.map((ele) => {
          if (ele.title == "" || ele.price =="" || ele.capacity == "") {
            setAlert(true)
            return
          }
        })
        if (isAlert) {
          alert('All fields are required')
          setAlert(false)
          return false
        }else{
          handleTicket()
        }
    }

     const handleTicket = () => {
        addTicket(tickets)
        // setShowModal(false)
     }

    useEffect(() => {
      if (showModal) {
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
  
    }, [showModal]);
  
    const modalY = modalAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [550, 140],
    });
  

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={tw`flex-1 bg-black bg-opacity-50`}>
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
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
        }}
        >
        {/**Header */}
        <View style={tw`flex-row justify-between items-center border-b border-gray-400 py-4 px-5`}>
          <TouchableOpacity
            style={tw`rounded-lg`}
            onPress={validate}
          >
          <Text style={[tw`font-bold text-base`,{ color:'#ff8552' }]}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`rounded-lg`}
            onPress={() => setShowModal(false)}
            >
            <Icon type="feather" name="x" size={20} color="gray" />
          </TouchableOpacity>
        </View>

      <KeyboardAwareScrollView keyboardDismissMode="interactive">
    <View style={tw`pb-24 mb-6`}>
     {form}
     {/**Button */}
    {numInputs < 3 && 
     <View style={tw`mt-2 p-2 mx-3`}>
     <TextButton label='Add New Ticket' buttonContainerStyle={[tw`h-12 rounded bg-transparent justify-start`,{}]}
     labelStyle={[tw`ml-2 text-base`,{color:'#ff8552'}]}
     iconName='plus'
     iconColor='#ff8552'
     size={18}
     onPress={addInput}
      />
     </View>
     }
    </View>

</KeyboardAwareScrollView>
   </Animated.View>
  </Modal>
  );
};

export default AddTicket;
