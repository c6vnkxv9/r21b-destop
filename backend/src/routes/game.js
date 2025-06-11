// src/routes/game.js
import {
    createGameController,
    getGameByIdController,
    getGamesController,
    joinGameController
} from '../controllers/game.js';

/**
 * 遊戲路由定義
 * @param {FastifyInstance} fastify - Fastify 實例
 * @param {Object} options - 路由選項
 */
export default async function (fastify, options) {
    // 獲取所有遊戲
    fastify.get('/', {
        schema: {
            description: '獲取所有遊戲',
            tags: ['game'],
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            name: { type: 'string' },
                            status: { type: 'string', enum: ['waiting', 'playing', 'ended'] },
                            players: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'string' },
                                        username: { type: 'string' },
                                        role: { type: 'string' }
                                    }
                                }
                            },
                            createdAt: { type: 'string', format: 'date-time' }
                        }
                    }
                }
            }
        },
        handler: getGamesController
    });

    // 獲取指定 ID 的遊戲
    fastify.get('/:id', {
        schema: {
            description: '獲取指定 ID 的遊戲',
            tags: ['game'],
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'string', description: '遊戲 ID' }
                }
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        status: { type: 'string', enum: ['waiting', 'playing', 'ended'] },
                        players: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    username: { type: 'string' },
                                    role: { type: 'string' }
                                }
                            }
                        },
                        createdAt: { type: 'string', format: 'date-time' }
                    }
                },
                404: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                }
            }
        },
        handler: getGameByIdController
    });

    // 創建新遊戲
    fastify.post('/', {
        schema: {
            description: '創建新遊戲',
            tags: ['game'],
            body: {
                type: 'object',
                required: ['name', 'userId'],
                properties: {
                    name: { type: 'string' },
                    userId: { type: 'string' },
                    maxPlayers: { type: 'integer', default: 10 }
                }
            },
            response: {
                201: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        status: { type: 'string' },
                        players: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    username: { type: 'string' },
                                    role: { type: 'string' }
                                }
                            }
                        },
                        createdAt: { type: 'string', format: 'date-time' }
                    }
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                }
            }
        },
        handler: createGameController
    });

    // 加入遊戲
    fastify.post('/:id/join', {
        schema: {
            description: '加入遊戲',
            tags: ['game'],
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'string', description: '遊戲 ID' }
                }
            },
            body: {
                type: 'object',
                required: ['userId'],
                properties: {
                    userId: { type: 'string' }
                }
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        status: { type: 'string' },
                        players: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    username: { type: 'string' },
                                    role: { type: 'string' }
                                }
                            }
                        }
                    }
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                },
                404: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                }
            }
        },
        handler: joinGameController
    });
} 