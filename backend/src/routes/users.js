import { createUserController, getUserByIdController, getUsersController } from '../controllers/users.js';

/**
 * 用戶路由定義
 * @param {FastifyInstance} fastify - Fastify 實例
 * @param {Object} options - 路由選項
 */
export default async function (fastify, options) {
    // 獲取所有用戶
    fastify.get('/', {
        schema: {
            description: '獲取所有用戶',
            tags: ['users'],
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            username: { type: 'string' },
                            email: { type: 'string' },
                            role: { type: 'string' }
                        }
                    }
                }
            }
        },
        handler: getUsersController
    });

    // 獲取指定 ID 的用戶
    fastify.get('/:id', {
        schema: {
            description: '獲取指定 ID 的用戶',
            tags: ['users'],
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'string', description: '用戶 ID' }
                }
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        username: { type: 'string' },
                        email: { type: 'string' },
                        role: { type: 'string' }
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
        handler: getUserByIdController
    });

    // 創建新用戶
    fastify.post('/', {
        schema: {
            description: '創建新用戶',
            tags: ['users'],
            body: {
                type: 'object',
                required: ['username', 'email', 'password'],
                properties: {
                    username: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string', minLength: 6 },
                    role: { type: 'string', enum: ['user', 'admin'], default: 'user' }
                }
            },
            response: {
                201: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        username: { type: 'string' },
                        email: { type: 'string' },
                        role: { type: 'string' }
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
        handler: createUserController
    });
} 