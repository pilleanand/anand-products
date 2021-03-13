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
      showModal: false,
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
    console.log('categoryInput0000',categoryInput);
    let { selectedCategories } = this.state;
    let isAlreadySelected = lodash.find(selectedCategories, { id: categoryInput.id });
    if (isAlreadySelected) {
      lodash.remove(selectedCategories, {
        id: isAlreadySelected.id
      });
    } else {
      selectedCategories.push(categoryInput);
    }
    console.log('selectedCategories', selectedCategories);
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
    return this.props.allCategories.map((category,) => {
      let isAlreadySelected = lodash.find(selectedCategories, { id: category.id });
      return (
        <ListItem key={`category_key${category.id}`} onPress={() => { this.onCheckboxPress(category, 'listItem') }}>
          <View style={styles.checkboxViewStyle}>
            <CheckBox
              onCheckColor="blue"
              value={isAlreadySelected ? true : false}
              style={styles.checkboxStyle}
              boxType='square'
            />
            <Text style={styles.categoryNameTxtStyle}>{category.name}</Text>
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
        <View style={styles.inputBoxRowStyle}>
          <InputBox
            name="placeholder"
            value={this.state.categorySearchText}
            placeholder="|Search & Select your category"
            onChangeText={this.onFilterSearchBoxTextChange}
            keyboardType='default'
            returnKeyType="done"
          />
          <View style={styles.doneIconContainerViewStyle}>
            <FontAwesome onPress={this.onModalClosePress}
              name='check'
              size={35}
              color='green'
            />
          </View>
        </View>
        <View style={styles.seeClearRowStyle}>
          <View style={styles.seeAllViewStyle}>
            <Text onPress={this.onSelectAllTextPress} style={styles.seeAllTxtStyle}>SELECT ALL</Text>
          </View>
          <View style={styles.clearViewStyle}>
            <Text onPress={this.onClearTextPress} style={styles.clearTxtStyle}>CLEAR</Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.categoriesConatainerViewStyle}>
            {this.getCategoriesListView()}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );

  render() {
    return (
      <View style={styles.containerViewStyle}>
        <View style={styles.filterBtnContainerViewStyle}>
          <Button iconLeft dark onPress={this.openFilterModal} style={styles.filterBtnStyle}>
            <Ionicons name='filter' size={27} color='white' />
            <Text style={styles.filterBtnLabelStyle}>Filter</Text>
          </Button>
        </View>
        {this.getModalViewWithCategories()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerViewStyle: {},
  modalInnerViewStyle: {
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
  },
  filterBtnContainerViewStyle: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row-reverse',
    marginBottom: 50,
    marginTop: 15
  },
  filterBtnStyle: {
    marginRight: 20,
    paddingHorizontal: 20
  },
  filterBtnLabelStyle: {
    color: 'white',
    fontSize: 20,
    marginLeft: 5
  },
  inputBoxRowStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  doneIconContainerViewStyle: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  seeClearRowStyle: {
    flexDirection: 'row',
    marginTop: 10, marginHorizontal: 10
  },
  seeAllViewStyle: {
    flex: 1,
    alignItems: 'flex-start'
  },
  seeAllTxtStyle: {
    color: 'blue',
    fontSize: 16,
    fontWeight: '500'
  },
  clearViewStyle: {
    flex: 1,
    alignItems: 'flex-end'
  },
  clearTxtStyle: {
    color: 'red',
    fontSize: 16, fontWeight: '500'
  },
  categoriesConatainerViewStyle: {
    marginTop: 20,
    marginHorizontal: 10
  },
  checkboxViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  },
  checkboxStyle: {
    alignSelf: 'center',
    width: 20,
    height: 20
  },
  categoryNameTxtStyle: {
    color: '#333',
    fontSize: 16,
    marginLeft: 10
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