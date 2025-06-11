// src/controllers/game.js

// 模擬遊戲數據 (實際應用中應使用數據庫)
const games = [
    {
        id: '1',
        name: '測試遊戲 1',
        status: 'waiting',
        players: [
            { id: '1', username: 'user1', role: null }
        ],
        maxPlayers: 10,
        createdAt: new Date().toISOString()
    }
];

// 模擬用戶數據 (實際應用中應從數據庫獲取)
const users = [
    { id: '1', username: 'user1', email: 'user1@example.com', role: 'admin' },
    { id: '2', username: 'user2', email: 'user2@example.com', role: 'user' }
];

/**
 * 獲取所有遊戲
 * @param {FastifyRequest} request - Fastify 請求對象
 * @param {FastifyReply} reply - Fastify 回應對象
 */
export const getGamesController = async (request, reply) => {
    // 在實際應用中，這裡應該從數據庫中獲取遊戲
    return games;
};

/**
 * 獲取指定 ID 的遊戲
 * @param {FastifyRequest} request - Fastify 請求對象
 * @param {FastifyReply} reply - Fastify 回應對象
 */
export const getGameByIdController = async (request, reply) => {
    const { id } = request.params;
    const game = games.find(g => g.id === id);

    if (!game) {
        return reply.code(404).send({ message: '找不到指定的遊戲' });
    }

    return game;
};

/**
 * 創建新遊戲
 * @param {FastifyRequest} request - Fastify 請求對象
 * @param {FastifyReply} reply - Fastify 回應對象
 */
export const createGameController = async (request, reply) => {
    const { name, userId, maxPlayers = 10 } = request.body;

    // 檢查用戶是否存在
    const user = users.find(u => u.id === userId);
    if (!user) {
        return reply.code(400).send({ message: '找不到指定的用戶' });
    }

    // 創建新遊戲 (在實際應用中，應該將遊戲保存到數據庫)
    const newGame = {
        id: (games.length + 1).toString(),
        name,
        status: 'waiting',
        players: [
            { id: user.id, username: user.username, role: null }
        ],
        maxPlayers,
        createdAt: new Date().toISOString()
    };

    games.push(newGame);

    return reply.code(201).send(newGame);
};

/**
 * 加入遊戲
 * @param {FastifyRequest} request - Fastify 請求對象
 * @param {FastifyReply} reply - Fastify 回應對象
 */
export const joinGameController = async (request, reply) => {
    const { id } = request.params;
    const { userId } = request.body;

    // 檢查遊戲是否存在
    const game = games.find(g => g.id === id);
    if (!game) {
        return reply.code(404).send({ message: '找不到指定的遊戲' });
    }

    // 檢查用戶是否存在
    const user = users.find(u => u.id === userId);
    if (!user) {
        return reply.code(400).send({ message: '找不到指定的用戶' });
    }

    // 檢查遊戲是否已經開始或結束
    if (game.status !== 'waiting') {
        return reply.code(400).send({ message: '無法加入已開始或已結束的遊戲' });
    }

    // 檢查用戶是否已經在遊戲中
    if (game.players.some(p => p.id === userId)) {
        return reply.code(400).send({ message: '用戶已經在遊戲中' });
    }

    // 檢查遊戲是否已滿
    if (game.players.length >= game.maxPlayers) {
        return reply.code(400).send({ message: '遊戲已滿' });
    }

    // 將用戶添加到遊戲 (在實際應用中，應該更新數據庫)
    game.players.push({
        id: user.id,
        username: user.username,
        role: null
    });

    return game;
}; 