import lodash from 'lodash';
import { Platform } from 'react-native';
export const fetchUniqueCategoriesFromProductLists = (products, previousCategories) => {

}

export const filterCategoriesBySearchSearchTerm = (categories, searchTerm) => {
  var results = lodash.filter(categories, function (item) {
    return item.name.toLowerCase().indexOf(searchTerm) > -1;
  });
  return results;
}