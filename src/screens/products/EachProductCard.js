import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Card } from 'native-base';
import PropTypes from 'prop-types';

const EachProductCard = (props) => {
  const product = props.item;

  return (
    <Card style={styles.conatinerCardStyle}>
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

EachProductCard.prototype = {
  item: PropTypes.object,
  index: PropTypes.number,
  addCategories: PropTypes.func
}

export default EachProductCard;