import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Card } from 'native-base';

const EachProductCard = (props) => {
console.log('props--',props);
const product = props.item;
  return (
    <Card
      style={styles.conatinerCardStyle}>
      <Text>{product.name}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  conatinerCardStyle: {
    flex: 1,
    marginHorizontal: 20,
    minHeight: 50,
    backgroundColor: 'red',
    marginTop: 10
  }
});

export default EachProductCard;