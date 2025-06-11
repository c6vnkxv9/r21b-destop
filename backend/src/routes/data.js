import {
    getAllDataController,
    getCharactersController,
    getColorListController,
    getExchangeSettingController,
    getPairIconListController,
    getScriptController
} from '../controllers/data.js';

/**
 * 數據路由定義
 * @param {FastifyInstance} fastify - Fastify 實例
 * @param {Object} options - 路由選項
 */
export default async function (fastify, options) {
    // 獲取所有數據
    fastify.get('/', {
        schema: {
            description: '獲取所有數據文件',
            tags: ['data'],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        script: { type: 'object' },
                        characters: { type: 'array' },
                        colorList: { type: 'object' },
                        exchangeSetting: { type: 'object' },
                        pairIconList: { type: 'array' }
                    }
                }
            }
        },
        handler: getAllDataController
    });

    // 獲取腳本數據
    fastify.get('/script', {
        schema: {
            description: '獲取腳本數據',
            tags: ['data'],
            response: {
                200: {
                    type: 'object'
                }
            }
        },
        handler: getScriptController
    });

    // 獲取角色數據
    fastify.get('/characters', {
        schema: {
            description: '獲取角色數據',
            tags: ['data'],
            response: {
                200: {
                    type: 'array'
                }
            }
        },
        handler: getCharactersController
    });

    // 獲取顏色列表
    fastify.get('/colors', {
        schema: {
            description: '獲取顏色列表',
            tags: ['data'],
            response: {
                200: {
                    type: 'object'
                }
            }
        },
        handler: getColorListController
    });

    // 獲取交換設置
    fastify.get('/exchange-settings', {
        schema: {
            description: '獲取交換設置',
            tags: ['data'],
            response: {
                200: {
                    type: 'object'
                }
            }
        },
        handler: getExchangeSettingController
    });

    // 獲取配對圖標列表
    fastify.get('/pair-icons', {
        schema: {
            description: '獲取配對圖標列表',
            tags: ['data'],
            response: {
                200: {
                    type: 'array'
                }
            }
        },
        handler: getPairIconListController
    });
} 