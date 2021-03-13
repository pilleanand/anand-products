import React,{ Component } from "react";
import { View, StyleSheet, Text, Modal } from 'react-native';
import { Button, Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CheckBox from '@react-native-community/checkbox';
import { connect } from 'react-redux';

class ProductFilter extends Component {
    constructor(props){
      super(props);
      this.state = {
        showModal: false
      }
    }


    onModalClosePress = () => {
      this.setState({ showModal: false });
    }

    openFilterModal = () => {
      this.setState({ showModal: true });
    }

  getModalViewWithCategories = () => (
    <Modal
      visible={this.state.showModal}
      animationType="slide"
      transparent={true}
      onRequestClose={this.onModalClosePress}>
      <View style={{
         marginTop: 100,
         marginBottom:40,
        marginHorizontal: 30,
         backgroundColor: "white",
         borderRadius: 20,
         padding: 35,
         alignItems: "center",
         justifyContent:'center',
        flex: 1,
         shadowColor: "#000",
         shadowOffset: {
           width: 0,
           height: 2
         },
         shadowOpacity: 0.25,
         shadowRadius: 3.84,
         elevation: 5
      }}>
        <View style={{ backgroundColor: 'white', flex: 1, padding: 20 }}>
          <View>
            <CheckBox
              title='Click Here1'
              checked={this.state.checked}
            />
            <CheckBox
              title='Click Here2'
              checked={this.state.checked}
            />
      </View>
        </View>
      </View>
    </Modal>
  );

    render(){
      return(
        <View style={styles.containerViewStyle}>
          <View style={{ alignItems: 'flex-end', flex: 1, flexDirection: 'row-reverse', marginBottom: 50, marginTop:15 }}>
            <Button iconLeft dark onPress={this.openFilterModal} style={{ marginRight: 20 , paddingHorizontal:20}}>
              <Ionicons name='filter'  size={27} color='white' fontSize={30} />
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
  headerViewStyle: { alignItems: 'center', backgroundColor: '#E75480', padding: 20 },
  headerTextStyle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  flatListStyle:{ flex: 1 },
  emptyProductsContainerViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  }
});

const mapStateToProps = ({ product }) => ({
  allCategories: product.allCategories
});

const mapDispactchToProps = dispatch => ({
  fetchProductsWithPagination: (pageNumber) => dispatch(fetchProductsWithPaginationRequestAction(pageNumber)),
  fetchCategories: () => dispatch(fetchCategoriesRequestAction())
});

export default connect(mapStateToProps, mapDispactchToProps)(ProductFilter);