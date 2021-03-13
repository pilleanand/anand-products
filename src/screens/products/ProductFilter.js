import React, { Component } from "react";
import { View, StyleSheet, Text, Modal, Platform, ScrollView } from 'react-native';
import { Button, ListItem } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import CheckBox from '@react-native-community/checkbox';
import { connect } from 'react-redux';
import lodash from 'lodash';
import InputBox from "../../common/components/InputBox";
import {
  filterCategoriesBySearchSearchTermAction,
  filterProductsByCategoriesSelectedAction
} from "../../actions/ProductActions";

class ProductFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
      categorySearchText: "",
      selectedCategories: []
    }
  }

  onModalClosePress = () => {
    this.props.filterProducts(this.state.selectedCategories);
    this.setState({ showModal: false });
  }

  openFilterModal = () => {
    this.setState({ showModal: true });
  }

  onFilterSearchBoxTextChange = (value) => {
    this.props.filterCategories(value);
    this.setState({ categorySearchText: value });
  }

  onCheckboxPress = (categoryInput) => {
    let { selectedCategories } = this.state;
    let isAlreadySelected = lodash.find(selectedCategories, { id: categoryInput.id });
    if (isAlreadySelected) {
      lodash.remove(selectedCategories, {
        id: isAlreadySelected.id
      });
    } else {
      selectedCategories.push(categoryInput);
    }
    this.setState({ selectedCategories });
  }

  onSelectAllTextPress = () => {
    let selectedCategories = this.props.allCategories;
    this.setState({ selectedCategories });
  }

  onClearTextPress = () => {
    this.setState({ selectedCategories: [] });
  }

  getCategoriesListView = () => {
    let { selectedCategories } = this.state;
    return this.props.allCategories.map((category, ) => {
      let isAlreadySelected = lodash.find(selectedCategories, { id: category.id });
      return (
        <ListItem key={`category_key${category.id}`} onPress={() => { this.onCheckboxPress(category, 'listItem') }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
            <CheckBox
              onCheckColor="blue"
              value={isAlreadySelected ? true : false}
              style={{ alignSelf: 'center', width: 20, height: 20 }}
              boxType='square'
            />
            <Text style={{ color: '#333', fontSize: 16, marginLeft: 10 }}>{category.name}</Text>
          </View>
        </ListItem>
      )
    });
  }

  getModalViewWithCategories = () => (
    <Modal
      visible={this.state.showModal}
      animationType="slide"
      transparent={true}
      onRequestClose={this.onModalClosePress}>
      <View style={styles.modalInnerViewStyle}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <InputBox
            name="placeholder"
            value={this.state.categorySearchText}
            placeholder="|Search & Select your category"
            onChangeText={this.onFilterSearchBoxTextChange}
            keyboardType='default'
            returnKeyType="done"
          />
          <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
            <FontAwesome onPress={this.onModalClosePress}
              name='check'
              size={35}
              color='green'
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 10 }}>
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Text onPress={this.onSelectAllTextPress} style={{ color: 'blue', fontSize: 16 }}>SELECT ALL</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text onPress={this.onClearTextPress} style={{ color: 'red', fontSize: 16 }}>CLEAR</Text>
          </View>
        </View>
        <ScrollView>
          <View style={{ marginTop: 20, marginHorizontal: 10 }}>
            {this.getCategoriesListView()}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );

  render() {
    return (
      <View style={styles.containerViewStyle}>
        <View style={{ alignItems: 'flex-end', flex: 1, flexDirection: 'row-reverse', marginBottom: 50, marginTop: 15 }}>
          <Button iconLeft dark onPress={this.openFilterModal} style={{ marginRight: 20, paddingHorizontal: 20 }}>
            <Ionicons name='filter' size={27} color='white' fontSize={30} />
            <Text style={{ color: 'white', fontSize: 20, marginLeft: 5 }}>Filter</Text>
          </Button>
        </View>
        {this.getModalViewWithCategories()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerViewStyle: {},
  modalInnerViewStyle:{
    marginTop: Platform.select({ android: 80, ios: 100 }),
    marginBottom: Platform.select({ android: 20, ios: 40 }),
    marginHorizontal: Platform.select({ android: 20, ios: 30 }),
    backgroundColor: "white",
    borderRadius: 20,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
});

const mapStateToProps = ({ product }) => ({
  allCategories: product.fliteredCategoriesByText
});

const mapDispactchToProps = dispatch => ({
  filterCategories: (search) => dispatch(filterCategoriesBySearchSearchTermAction(search)),
  filterProducts: (categories) => dispatch(filterProductsByCategoriesSelectedAction(categories))
});

export default connect(mapStateToProps, mapDispactchToProps)(ProductFilter);