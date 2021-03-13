import { MyNetworkHandler } from "../util/network/NetworkHandler";
import { FETCH_PRODUCCTS_END_POINT } from "../constants/ProductsEndpoints";

export const fetchProducstWithPaginationApi = async (pageNumber) => {
  try {
    const url = `${FETCH_PRODUCCTS_END_POINT}?page=${pageNumber}`;
    const productResponse = await MyNetworkHandler.get(url);
    if(productResponse?.data && productResponse?.data?.code == 200){
      return productResponse.data;
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log('fetchProducstWithPaginationApi error--', error);
    return null;
  }
}