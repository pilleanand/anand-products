import lodash from 'lodash';

export const filterProductsBySelectedCategories = (products, categories) => {
  const filteredProducts = [];
  if (categories.length === 0) {
    // Just return all the items products since no filters are applied
    return products;
  }
  lodash.filter(products, function (product) {
    // productMatch will do a set A - B which is equal to the all the
    //  categories in the product categories are checked 
    // and selected from the categories filtered on id 
    var productMatch = lodash(product.categories).intersectionBy(categories, 'id').map('id').value();
    if (productMatch.length > 0) {
      filteredProducts.push(product);
    }
  });
  return filteredProducts;
}

export const filterCategoriesBySearchSearchTerm = (categories, searchTerm) => {
  var results = lodash.filter(categories, function (item) {
    // to avoid case sensitive, convert both side texts to lowercase
    //  and then check for existing of string match
    return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
  });
  return results;
}