import React from "react";
import { View, Input, Label, Item } from "native-base";
import { _ScrollView, Text } from "react-native";
import PropTypes from "prop-types";
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const InputBox = (props) => {
  const {
    label,
    name,
    hasError,
    keyboardType,
    isFocused,
    marginTop = 20,
    textAreaHeight = 30,
    multiLine = false,
    value,
    errorLabel = "",
    disabled,
    editable = true,
    secureTextEntry,
    autoCapitalize,
    getRef,
    returnKeyType,
    placeholder
  } = props;

  let boxHeight = 48;

  return (
    <React.Fragment>
      <View
        style={{
          backgroundColor: hasError ? "#fbe4e4" : "#fffafa",
          borderTopRightRadius: 8,
          borderTopLeftRadius: 8,
          marginTop: marginTop,
          width:'80%'
        }}
      >
        <Item
          style={{
            borderWidth: 2,
            borderColor:"#ed3332",
            height: multiLine && (value || isFocused) ? textAreaHeight : boxHeight,
          }}
        >
          <Label
            style={{
              color:  "#d9c1c1",
              paddingLeft: "4%",
              fontSize:16,
              letterSpacing: 0.4,
            }}
          >
            {label}
          </Label>
          <Input
            defaultValue={value}
            disabled={disabled}
            keyboardType={keyboardType}
            placeholder={placeholder}
            placeholderStyle={{ fontSize: 10 }}
            style={[
              {
                paddingLeft: 10,
                color: 'grey',
                paddingTop: multiLine ? "4%" : 0,
              },
              props.inputStyle ? props.inputStyle : {},
            ]}
            onFocus={() => {
              props.setFocus(name)
            }}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize}
            getRef={getRef}
            returnKeyType={returnKeyType}
            onChangeText={(val) => props.onChangeText(val, name)}
            value={value}
            editable={editable}
          />
          <FontAwesome
              name='search'
              size={20}
              color='grey'
            />
        </Item>
      </View>
      {hasError && (
        <Text
          style={{
            paddingLeft: "4.3%",
            fontSize: 12,
            letterSpacing: 0.5,
            color: "#ed3332",
          }}
        >
          {errorLabel}
        </Text>
      )}
    </React.Fragment>
  );
};

InputBox.propTypes = {
  boxHeight: PropTypes.number,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  hasError: PropTypes.bool,
  keyboardType: PropTypes.string,
  isFocused: PropTypes.string,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  textAreaHeight: PropTypes.number,
  multiline: PropTypes.bool,
  errorLabel: PropTypes.string,
  disabled: PropTypes.bool,
  onBlur: PropTypes.func,
  onChangeText: PropTypes.func,
  setFocus: PropTypes.func,
  placeholder: PropTypes.string
};

InputBox.defaultProps = {
  value: "",
  name: "",
  disabled: false,
  onBlur: () => { },
  setFocus: () => { },
  placeholder:""
};

export default InputBox;
