import lodash from 'lodash';

export const filterProductsBySelectedCategories = (products, categories) => {
  const filteredProducts = [];
  if (categories.length === 0) {
    return products
  }
  lodash.filter(products, function (product) {
    var productMatch = lodash(product.categories).intersectionBy(categories, 'id').map('id').value();
    if (productMatch.length > 0) {
      filteredProducts.push(product);
    }
  });
  return filteredProducts;
}

export const filterCategoriesBySearchSearchTerm = (categories, searchTerm) => {
  var results = lodash.filter(categories, function (item) {
    return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
  });
  return results;
}