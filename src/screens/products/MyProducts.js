import React, { PureComponent } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import EachProductCard from './EachProductCard';
import ProductFilter from './ProductFilter';
import {
  fetchCategoriesRequestAction,
  fetchProductsWithPaginationRequestAction
} from '../../actions/ProductActions';
import { APP_THEME_COLOR, WHITE_COLOR } from '../../constants/Colors';

class MyProducts extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1
    }
  }

  componentDidMount() {
    this.fetchProductsWithPagination(1);
    this.props.fetchCategories();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.products !== prevProps.products) {
      this.paginateWhenFilterApplied();
    }
  }

  paginateWhenFilterApplied = () => {
    //When the filtered items are less than 4 the automtic pagination is not trigered 
    // since it does not react to end so manual api is done
    //this is corner case for which the data for the filtered items is not availbe in the first 20 
    // set and avialbe somewhere around greater than 20
    if (this.props.allowFetch && this.props.products.length <= 3
      && this.props.fliteredCategoriesByText?.length > 0) {
      let pageNumber = this.state.pageNumber + 1;
      this.setState({
        pageNumber
      }, () => {
        this.fetchProductsWithPagination(pageNumber);
      });
    }
  }

  refreshProducts = () => {
    const pageNumber = 1;
    this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
    this.setState({
      pageNumber
    }, () => {
      this.fetchProductsWithPagination(1);
      this.props.fetchCategories();
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

  renderEachProduct = ({ item, index }) => {
    return (
      <EachProductCard
        item={item}
        index={index}
      />
    );
  }

  render() {
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
          onRefresh={this.refreshProducts}
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
  containerViewStyle: { flex: 1 },
  headerViewStyle: {
    alignItems: 'center',
    backgroundColor: APP_THEME_COLOR,
    padding: 20
  },
  headerTextStyle: {
    color: WHITE_COLOR,
    fontSize: 20, fontWeight: 'bold'
  },
  flatListStyle: { flex: 1 },
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
  fliteredCategoriesByText: product.fliteredCategoriesByText,
});

const mapDispactchToProps = dispatch => ({
  fetchProductsWithPagination: (pageNumber) => dispatch(fetchProductsWithPaginationRequestAction(pageNumber)),
  fetchCategories: () => dispatch(fetchCategoriesRequestAction())
});

export default connect(mapStateToProps, mapDispactchToProps)(MyProducts);
