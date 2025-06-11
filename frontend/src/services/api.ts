import axios from 'axios';

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000/api/v1';

// 創建axios實例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// 數據API服務
export const dataApi = {
  /**
   * 獲取所有數據
   * @returns {Promise} 所有數據
   */
  getAllData: async () => {
    try {
      const response = await apiClient.get('/data');
      return response.data;
    } catch (error) {
      console.error('獲取所有數據失敗:', error);
      throw error;
    }
  },

  /**
   * 獲取角色數據
   * @returns {Promise} 角色數據
   */
  getCharacters: async () => {
    try {
      const response = await apiClient.get('/data/characters');
      return response.data;
    } catch (error) {
      console.error('獲取角色數據失敗:', error);
      throw error;
    }
  },

  /**
   * 獲取腳本數據
   * @returns {Promise} 腳本數據
   */
  getScript: async () => {
    try {
      const response = await apiClient.get('/data/script');
      return response.data;
    } catch (error) {
      console.error('獲取腳本數據失敗:', error);
      throw error;
    }
  },

  /**
   * 獲取顏色列表
   * @returns {Promise} 顏色列表
   */
  getColorList: async () => {
    try {
      const response = await apiClient.get('/data/colors');
      return response.data;
    } catch (error) {
      console.error('獲取顏色列表失敗:', error);
      throw error;
    }
  },

  /**
   * 獲取配對圖標列表
   * @returns {Promise} 配對圖標列表
   */
  getPairIconList: async () => {
    try {
      const response = await apiClient.get('/data/pair-icons');
      return response.data;
    } catch (error) {
      console.error('獲取配對圖標列表失敗:', error);
      throw error;
    }
  },

  /**
   * 獲取交換設置
   * @returns {Promise} 交換設置
   */
  getExchangeSetting: async () => {
    try {
      const response = await apiClient.get('/data/exchange-settings');
      return response.data;
    } catch (error) {
      console.error('獲取交換設置失敗:', error);
      throw error;
    }
  }
};

export default apiClient; 