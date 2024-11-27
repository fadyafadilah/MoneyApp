import { StyleSheet, Text, TextInput } from "react-native";
import React from "react";

const DataInput = ({
  label,
  placeholder,
  keyboardType,
  onChangeText,
  nameState,
  value,
}) => {
  return (
    <>
      <Text style={styles.label}>{label} </Text>
      <TextInput
        placeholder={placeholder}
        style={styles.textInput}
        keyboardType={keyboardType}
        value={value}
        onChangeText={(text) => onChangeText(nameState, text)}
      />
    </>
  );
};

export default DataInput;

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "bold",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
});
