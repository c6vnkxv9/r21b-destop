import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import dotenv from 'dotenv';
import Fastify from 'fastify';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// 導入 API 路由
import dataRoutes from './routes/data.js';
import gameRoutes from './routes/game.js';
import userRoutes from './routes/users.js';

// 獲取當前文件的目錄
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 加載環境變數
dotenv.config({ path: join(__dirname, '../.env') });

// 配置變數
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const API_PREFIX = process.env.API_PREFIX || '/api/v1';

// 創建 Fastify 實例
const fastify = Fastify({
    logger: true,
    trustProxy: true
});

// 註冊 CORS 插件
fastify.register(cors, {
    origin: process.env.CORS_ORIGIN || true
});

// 註冊 Swagger 插件
fastify.register(swagger, {
    swagger: {
        info: {
            title: 'R21B API 文檔',
            description: 'R21B 應用程式的 API 文檔',
            version: '1.0.0'
        },
        host: `${HOST}:${PORT}`,
        schemes: ['http', 'https'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
            { name: 'root', description: '根路由' },
            { name: 'users', description: '用戶相關' },
            { name: 'game', description: '遊戲相關' },
            { name: 'data', description: '遊戲數據相關' }
        ]
    }
});

// 註冊 Swagger UI 插件
fastify.register(swaggerUI, {
    routePrefix: '/documentation',
    uiConfig: {
        docExpansion: 'list',
        deepLinking: false
    }
});

// 路由 - 根
fastify.get('/', async (request, reply) => {
    return { message: '歡迎使用 R21B 後端 API', version: '1.0.0' };
});

// 路由 - API 健康檢查
fastify.get(`${API_PREFIX}/health`, async (request, reply) => {
    return { status: 'ok', timestamp: new Date().toISOString() };
});

// 註冊 API 路由
fastify.register(userRoutes, { prefix: `${API_PREFIX}/users` });
fastify.register(gameRoutes, { prefix: `${API_PREFIX}/game` });
fastify.register(dataRoutes, { prefix: `${API_PREFIX}/data` });

// 啟動服務器
const start = async () => {
    try {
        await fastify.listen({ port: PORT, host: '0.0.0.0' });
        console.log(`伺服器運行在 http://${HOST}:${PORT}`);
        console.log(`API 文檔可在 http://${HOST}:${PORT}/documentation 查看`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start(); 