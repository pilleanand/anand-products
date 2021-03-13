import React, { Component } from "react";
import { View, StyleSheet, Text, Modal, Platform, ScrollView } from 'react-native';
import { Button, ListItem } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import { connect } from 'react-redux';
import lodash from 'lodash';
import InputBox from "../../common/components/InputBox";
import {
  filterCategoriesBySearchSearchTermAction,
  filterProductsByCategoriesSelectedAction
} from "../../actions/ProductActions";
import {
  APP_THEME_COLOR,
  BLACK_COLOR,
  GRAY_20_COLOR,
  RED_COLOR,
  WHITE_COLOR,
  BLUE_COLOR
} from "../../constants/Colors";

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
    return this.props.allCategories.map((category,) => {
      let isAlreadySelected = lodash.find(selectedCategories, { id: category.id });
      return (
        <ListItem key={`category_key${category.id}`} onPress={() => { this.onCheckboxPress(category, 'listItem') }}>
          <View style={styles.checkboxViewStyle}>
            <CheckBox
              onCheckColor={BLUE_COLOR}
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
        </View>
        <View style={styles.seeClearRowStyle}>
          <View style={styles.seeAllViewStyle}>
            <Button transparent onPress={this.onSelectAllTextPress} >
              <Text style={styles.seeAllTxtStyle}>SELECT ALL</Text>
            </Button>
          </View>
          <View style={styles.clearViewStyle}>
            <Button style={styles.clearBtnStyle} transparent onPress={this.onClearTextPress} >
              <Text style={styles.clearTxtStyle}>CLEAR</Text>
            </Button>
          </View>
        </View>
        <ScrollView>
          <View style={styles.categoriesConatainerViewStyle}>
            {this.getCategoriesListView()}
          </View>
        </ScrollView>
        <View style={styles.doneIconContainerViewStyle}>
          <Button style={styles.applyBtnStyle} onPress={this.onModalClosePress}>
            <Text style={styles.applyTextStyle}>APPLY</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );

  render() {
    return (
      <View style={styles.containerViewStyle}>
        <View style={styles.filterBtnContainerViewStyle}>
          <Button iconLeft onPress={this.openFilterModal} style={styles.filterBtnStyle}>
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
    marginBottom: Platform.select({ android: 20, ios: 20 }),
    marginHorizontal: Platform.select({ android: 20, ios: 30 }),
    backgroundColor: WHITE_COLOR,
    borderRadius: 20,
    flex: 1,
    shadowColor: BLACK_COLOR,
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
    backgroundColor: APP_THEME_COLOR,
    marginRight: 20,
    paddingHorizontal: 20
  },
  filterBtnLabelStyle: {
    color: WHITE_COLOR,
    fontSize: 20,
    marginLeft: 5
  },
  inputBoxRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  doneIconContainerViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 10
  },
  applyBtnStyle: {
    alignSelf: 'stretch',
    borderRadius: 10,
    backgroundColor: APP_THEME_COLOR,
    alignItems: 'center',
    justifyContent: 'center'
  },
  applyTextStyle: {
    color: WHITE_COLOR,
    fontWeight: '600',
    textAlign: 'center'
  },
  seeClearRowStyle: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 20
  },
  seeAllViewStyle: {
    flex: 1,
    alignItems: 'flex-start'
  },
  seeAllTxtStyle: {
    color: BLUE_COLOR,
    fontSize: 16,
    fontWeight: '500'
  },
  clearViewStyle: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  clearBtnStyle: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end'
  },
  clearTxtStyle: {
    color: RED_COLOR,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'right'
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
    color: GRAY_20_COLOR,
    fontSize: 16,
    marginLeft: 10,
    width: '90%'
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