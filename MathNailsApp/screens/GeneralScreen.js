import { View, Text, Modal } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { ButtonSpecial } from "../components/components";

const GeneralScreen = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {showPicker && (
          <Modal>
            <DateTimePicker 
              mode="date"
              display="spinner"
              value={date}
            />
          <ButtonSpecial title="Закрыть" onPress={togglePicker}/>
          </Modal>
        )
        }
        <ButtonSpecial title="Открыть" onPress={togglePicker}/>
      </View>
    );
}
  
export default GeneralScreen;