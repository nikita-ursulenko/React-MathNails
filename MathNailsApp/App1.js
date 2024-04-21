import { View, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

const GeneralScreen = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
          />
      </View>
    );
}
  
export default GeneralScreen;