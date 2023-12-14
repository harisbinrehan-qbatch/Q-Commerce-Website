import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { message, notification } from 'antd';
import { isEmpty } from 'lodash';

export const fetchUserProducts = createAsyncThunk(
  'products/fetchUserProducts',
  async ({ skip, limit, filterObject }, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const response = await axios.get(
        'http://localhost:5000/v1/products/userProducts',
        {
          params: {
            skip,
            limit,
            filterObject
          },
          headers: { Authorization: `Bearer ${state.authentication.user.token}` }
        }
      );

      if (response.data.products.length === 0) {
        return rejectWithValue({ error: 'No Products Found' });
      }

      if (response.data.message) {
        return rejectWithValue({ error: response.data.message });
      }

      return response.data;
    } catch (error) {
      return rejectWithValue({ error: 'Network Error', originalError: error });
    }
  }
);

export const fetchAdminProducts = createAsyncThunk(
  'products/fetchAdminProducts',
  async (filterObject, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { limit, page } = state.products;
      const response = await axios.get(
        `http://localhost:5000/v1/products/adminProducts?skip=${
          (page - 1) * limit
        }&limit=${limit}`,
        {
          params: { filterObject },
          headers: { Authorization: `Bearer ${getState().authentication.user.token}` }
        }
      );

      if (response.data.products.length === 0) {
        return rejectWithValue({ error: 'No Products Found' });
      }

      if (response.data.message) {
        return rejectWithValue({ error: response.data.message });
      }

      return response.data;
    } catch (error) {
      return rejectWithValue({ error: 'Network Error', originalError: error });
    }
  }
);

export const fetchDisplayProduct = createAsyncThunk(
  'products/fetchDisplayProduct',
  async (_id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/v1/products/displayProduct?_id=${_id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ error: 'Network Error', originalError: error });
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (requestData, { getState, rejectWithValue }) => {
    const state = getState();

    try {
      const response = await axios.post(
        'http://localhost:5000/v1/products/product',
        requestData,
        {
          headers: {
            Authorization: `Bearer ${state.authentication.user.token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.response.data });
    }
  }
);
export const addBulkProducts = createAsyncThunk(
  'products/addBulkProducts',
  async (requestData, { getState, rejectWithValue }) => {
    const state = getState();
    try {
      const response = await axios.post(
        'http://localhost:5000/v1/products/bulkProducts',
        requestData,
        {
          headers: {
            Authorization: `Bearer ${state.authentication.user.token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.response.data });
    }
  }
);
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (_id, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const response = await axios.delete(
        `http://localhost:5000/v1/products/product?_id=${_id}`,
        { headers: { Authorization: `Bearer ${state.authentication.user.token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (body, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const response = await axios.put(
        'http://localhost:5000/v1/products/product',
        body,
        {
          headers: {
            Authorization: `Bearer ${state.authentication.user.token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    isFilter: false,
    data: [],
    displayProduct: [],
    bulkUploadResult: {},
    importBulkSuccess: false,
    page: 1,
    limit: 5,
    totalCount: 0,
    isProductError: false,
    productMessage: null,
    productsLoading: false,
    editSuccess: false,
    deleteSuccess: false,
    addSuccess: false
  },
  reducers: {
    incrementPage(state) {
      state.page += 1;
    },

    decrementPage(state) {
      state.page -= 1;
    },
    setPageOne(state) {
      state.page = 1;
    },
    setPage(state, action) {
      state.page = action.payload;
    },

    setLimit(state, action) {
      state.limit = action.payload;
    },

    setTotalCount(state, action) {
      state.totalCount = action.payload;
    },
    setAnyPage(state, action) {
      state.page = action.payload;
    },
    setSkip(state, action) {
      state.skip = action.payload;
    },
    setIsFilter(state, { payload }) {
      state.isFilter = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProducts.fulfilled, (state, action) => {
        if (state.isFilter) {
          state.data = action.payload.products;
        } else {
          state.data = [...state.data, ...action.payload.products];
          state.totalCount = action.payload.totalCount;
        }
        state.displayProduct = action.payload.products[0];
        state.isProductError = false;
        state.productsLoading = false;
      })
      .addCase(fetchUserProducts.pending, (state) => {
        state.isProductError = false;
        if (isEmpty(state.data)) {
          state.productsLoading = true;
        } else {
          state.productsLoading = false;
        }
      })
      .addCase(fetchUserProducts.rejected, (state, action) => {
        state.productMessage = action.payload || 'Internal Server Error.';
        state.data = [];
        state.isProductError = true;
        state.productsLoading = false;
      })

      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.data = action.payload.products;
        state.totalCount = action.payload.totalCount;
        state.isProductError = false;
        state.productsLoading = false;
        state.importBulkSuccess = false;
      })
      .addCase(fetchAdminProducts.pending, (state) => {
        state.isProductError = false;
        state.productsLoading = true;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.productMessage = action.payload || 'Internal Server Error.';
        state.data = [];
        state.isProductError = true;
        state.productsLoading = false;
      })

      .addCase(addProduct.fulfilled, (state) => {
        state.addSuccess = true;
        state.productsLoading = false;
        state.productMessage = 'Product added Successfully';
        notification.success({
          description: state.productMessage,
          type: 'success',
          duration: 2
        });
      })
      .addCase(addProduct.pending, (state) => {
        state.productsLoading = true;
        state.addSuccess = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.addSuccess = false;
        state.productsLoading = false;
        state.productMessage = action.payload.message || 'Error adding product';
        notification.error({
          description: state.productMessage,
          type: 'error',
          duration: 2
        });
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.productsLoading = false;
        state.productMessage = action.payload.message || 'Product deleted Successfully';
        state.deleteSuccess = true;
        message.success(state.productMessage, 2);
      })
      .addCase(deleteProduct.pending, (state) => {
        state.productsLoading = true;
        state.deleteSuccess = false;
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.productsLoading = false;
        state.deleteSuccess = false;
        state.productMessage = 'Error deleting product';
        message.error(state.productMessage, 2);
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        state.data = action.payload.products;
        state.editSuccess = true;
        state.productsLoading = false;
        message.success('Product updated Successfully', 2);
      })
      .addCase(updateProduct.pending, (state) => {
        state.editSuccess = false;
        state.productsLoading = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.productMessage = action.payload.message || 'Error Updating product';
        state.editSuccess = false;
        state.productsLoading = false;
        message.error(state.productMessage, 2);
      })

      .addCase(fetchDisplayProduct.fulfilled, (state, action) => {
        state.displayProduct = action.payload.displayProduct;
      })
      .addCase(fetchDisplayProduct.pending, () => {})
      .addCase(fetchDisplayProduct.rejected, (state, action) => {
        state.productMessage = action.payload.message || 'Error displaying product';
        message.error(state.productMessage, 2);
      })

      .addCase(addBulkProducts.fulfilled, (state, action) => {
        state.importBulkSuccess = true;
        state.productsLoading = false;
        state.bulkUploadResult = action.payload.bulkUploadResult;
      })
      .addCase(addBulkProducts.pending, (state) => {
        state.productsLoading = true;
      })
      .addCase(addBulkProducts.rejected, (state) => {
        state.importBulkSuccess = false;
        state.productsLoading = false;
        state.bulkUploadResult = {};
      });
  }
});

export const {
  incrementPage,
  decrementPage,
  setPageOne,
  setPage,
  setLimit,
  setTotalCount,
  setAnyPage,
  setSkip,
  setIsFilter
} = productsSlice.actions;

export default productsSlice;
