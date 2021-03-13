import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Card } from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

const EachProductCard = (props) => {
  const product = props.item;

  return (
    <Card style={styles.conatinerCardStyle}>
      <View style={styles.imageNameRowStyle}>
        <Image style={styles.productImgStyle} source={{ uri: product.image }} />
        <View style={styles.nameConatinerViewStyle}>
          <Text style={styles.productNameTxtStyle} ellipsizeMode='tail' numberOfLines={2}>{product.name}</Text>
          <Text style={styles.productDescriptionTxtStyle} numberOfLines={2} ellipsizeMode='tail'>{product.description}</Text>
          <View style={styles.priceViewStyle}>
            <View style={styles.priceColumnViewStyle}>
              <EntypoIcon name='price-tag' size={18} color='red' />
              <Text style={styles.priceTxtStyle}>{product.price}</Text>
            </View>
            <View style={styles.priceColumnViewStyle}>
              <MaterialIcons name='local-offer' size={18} color='green' />
              <Text style={styles.discountTxtStyle}>{product.discount_amount}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.categoriesContainerViewStyle}>
        {product.categories.map((category, index) => (
          <View key={`category_key_${product.id}${category.id}`} style={styles.priceColumnViewStyle}>
            <MaterialIcons name='category' size={18} color='grey' />
            <Text style={styles.categoryNameTxtStyle} numberOfLines={1} ellipsizeMode='tail'>{category.name}</Text>
          </View>
      ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  conatinerCardStyle: {
    flex: 1,
    marginRight:20,
    marginLeft: 20,
    minHeight: 50,
    marginTop: 10,
    backgroundColor: '#F7F0D5',
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderRadius: 10
  },
  productNameTxtStyle: {
    fontSize: 16,
    color:'#111',
  },
  productDescriptionTxtStyle:{
    fontSize: 12,
    marginTop:5,
    color:'#666',
    maxWidth:'88%'
  },
  imageNameRowStyle:{
    flex:1,
    flexDirection:'row',
    alignItems:'flex-start'
  },
  productImgStyle:{
    width: 80,
    height: 80,
    borderRadius: 5
  },
  nameConatinerViewStyle:{
    marginLeft:10,
    flexDirection:'column',
    justifyContent:'flex-start'
  },
  priceViewStyle: {
    marginTop: 5,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  priceColumnViewStyle:{
    flex: 1,
    flexDirection: 'row'
  },
  priceTxtStyle:{
    fontSize: 12,
    marginLeft: 5,
    color: 'red'
  },
  discountTxtStyle:{
    fontSize: 12,
    marginLeft: 5,
    color: 'green'
  },
  categoryNameTxtStyle:{
    fontSize: 12,
    marginLeft: 5,
    color: 'grey'
  },
  categoriesContainerViewStyle: {
    marginTop:5,
  },
});

EachProductCard.prototype = {
  item: PropTypes.object,
  index: PropTypes.number,
  addCategories: PropTypes.func
}

export default EachProductCard;