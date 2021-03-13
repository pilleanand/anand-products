import lodash from 'lodash';

export const filterProductsBySelectedCategories = (products, categories) => {
  var results = lodash.filter(products, function (product) {
    var productMatch = lodash(product.categories).intersectionBy(categories, 'id').map('id').value();
    if (productMatch.length > 0) {
      return product
    }
  });
  return results;
}

export const filterCategoriesBySearchSearchTerm = (categories, searchTerm) => {
  var results = lodash.filter(categories, function (item) {
    return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
  });
  return results;
}