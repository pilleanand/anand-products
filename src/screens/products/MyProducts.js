import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import EachProductCard from './EachProductCard';
import { fetchProductsWithPaginationRequestAction } from '../../actions/ProductActions';

class MyProducts extends Component {

  constructor(props){
    super(props);
    this.state = {
      pageNumber: 1
    }
  }

  componentDidMount(){
    this.fetchProductsWithPagination(1);
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

  render(){
    return (
      <FlatList
        data={this.props.products}
        extraData={this.state.pageNumber}
        ref={(ref) => { this.flatListRef = ref; }}
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
        renderItem={EachProductCard}
        ListEmptyComponent={this.renderEmptyProductsList}
        keyExtractor={(item) => `product_key_${(Math.random() * 1000)}`}
      />
    );
  }
}

const styles = StyleSheet.create({
  emptyProductsContainerViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  }
});

const mapStateToProps = ({ product }) => ({
  products: product.totalProducts,
  showProgress: product.showProgress,
  refresh: product.refresh,
  allowFetch: product.allowFetch
});

const mapDispactchToProps = dispatch => ({
  fetchProductsWithPagination: (pageNumber) => dispatch(fetchProductsWithPaginationRequestAction(pageNumber))
});

export default connect(mapStateToProps, mapDispactchToProps)(MyProducts);
