import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Card } from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import {
  APP_THEME_COLOR,
  BLACK_17_COLOR,
  GREEN_COLOR,
  DIM_GREY_COLOR,
  COCONUT_CREAM_COLOR,
  GREY_COLOR
} from '../../constants/Colors';

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
              <EntypoIcon name='price-tag' size={18} color={APP_THEME_COLOR} />
              <Text style={styles.priceTxtStyle}>{product.price}</Text>
            </View>
            <View style={styles.priceColumnViewStyle}>
              <MaterialIcons name='local-offer' size={18} color={GREEN_COLOR} />
              <Text style={styles.discountTxtStyle}>{product.discount_amount}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.categoriesContainerViewStyle}>
        {product.categories.map((category, index) => (
          <View key={`category_key_${product.id}${category.id}`} style={styles.priceColumnViewStyle}>
            <MaterialIcons name='category' size={18} color={GREY_COLOR} />
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
    marginRight: 20,
    marginLeft: 20,
    minHeight: 50,
    marginTop: 10,
    backgroundColor: COCONUT_CREAM_COLOR,
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderRadius: 10
  },
  productNameTxtStyle: {
    fontSize: 16,
    color: BLACK_17_COLOR,
  },
  productDescriptionTxtStyle: {
    fontSize: 12,
    marginTop: 5,
    color: DIM_GREY_COLOR,
    maxWidth: '88%'
  },
  imageNameRowStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  productImgStyle: {
    width: 80,
    height: 80,
    borderRadius: 5
  },
  nameConatinerViewStyle: {
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  priceViewStyle: {
    marginTop: 5,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  priceColumnViewStyle: {
    flex: 1,
    flexDirection: 'row'
  },
  priceTxtStyle: {
    fontSize: 12,
    marginLeft: 5,
    color: APP_THEME_COLOR
  },
  discountTxtStyle: {
    fontSize: 12,
    marginLeft: 5,
    color: GREEN_COLOR
  },
  categoryNameTxtStyle: {
    fontSize: 12,
    marginLeft: 5,
    color: GREY_COLOR
  },
  categoriesContainerViewStyle: {
    marginTop: 5,
  },
});

EachProductCard.prototype = {
  item: PropTypes.object,
  index: PropTypes.number,
  addCategories: PropTypes.func
}

export default EachProductCard;