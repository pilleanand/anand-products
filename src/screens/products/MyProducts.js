import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import EachProductCard from './EachProductCard';
import {
  fetchCategoriesRequestAction,
  fetchProductsWithPaginationRequestAction
} from '../../actions/ProductActions';
import ProductFilter from './ProductFilter';

class MyProducts extends Component {

  constructor(props){
    super(props);
    this.state = {
      pageNumber: 1
    }
  }

  componentDidMount(){
    this.fetchProductsWithPagination(1);
    this.props.fetchCategories();
  }

  refreshProducsta = () => {
    const pageNumber = 0;
    this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
    this.setState({
      pageNumber
    }, () => {
      this.fetchProductsWithPagination(1);
    });
  }


  fetchProductsWithPagination = (pageNumber) => {
    this.props.fetchProductsWithPagination(pageNumber);
  }

  renderEmptyProductsList = () => {
    if (this.props.showProgress) {
      return (
        <View style={styles.emptyProductsContainerViewStyle}>
          <Text>Loading Products, please wait</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.emptyProductsContainerViewStyle}>
          <Text> No Products matched!</Text>
        </View>
      );
    }
  }

  renderEachProduct = ({ item, index}) => {
    return(
      <EachProductCard
        item={item}
        index={index}
      />
    );
  }

  render(){
    // console.log('products---',this.props.products)

    return (
      <View style={styles.containerViewStyle}>
        <View style={styles.headerViewStyle}>
          <Text style={styles.headerTextStyle}>Products</Text>
        </View>
        <ProductFilter />
        <FlatList
          data={this.props.products}
          extraData={this.state.pageNumber}
          ref={(ref) => { this.flatListRef = ref; }}
          style={styles.flatListStyle}
          onEndReachedThreshold={0.5}
          onEndReached={({ distanceFromEnd }) => {
            if (distanceFromEnd >= 0 && this.props.allowFetch) {
              let pageNumber = this.state.pageNumber + 1;
              this.setState({
                pageNumber
              }, () => {
                this.fetchProductsWithPagination(pageNumber);
              });
            }
          }
          }
          onRefresh={this.fetchProductsWithPagination}
          refreshing={this.props.refresh}
          renderItem={this.renderEachProduct}
          ListEmptyComponent={this.renderEmptyProductsList}
          keyExtractor={(item) => `product_key_${(Math.random() * 1000)}`}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerViewStyle: { flex: 1},
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
  products: product.filteredProducts,
  showProgress: product.showProgress,
  refresh: product.refresh,
  allowFetch: product.allowFetch,
  allCategories: product.allCategories
});

const mapDispactchToProps = dispatch => ({
  fetchProductsWithPagination: (pageNumber) => dispatch(fetchProductsWithPaginationRequestAction(pageNumber)),
  fetchCategories: () => dispatch(fetchCategoriesRequestAction())
});

export default connect(mapStateToProps, mapDispactchToProps)(MyProducts);
