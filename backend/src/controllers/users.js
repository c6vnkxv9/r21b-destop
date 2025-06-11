// src/controllers/users.js

// 模擬用戶數據 (實際應用中應使用數據庫)
const users = [
    { id: '1', username: 'user1', email: 'user1@example.com', role: 'admin' },
    { id: '2', username: 'user2', email: 'user2@example.com', role: 'user' }
];

/**
 * 獲取所有用戶
 * @param {FastifyRequest} request - Fastify 請求對象
 * @param {FastifyReply} reply - Fastify 回應對象
 */
export const getUsersController = async (request, reply) => {
    // 在實際應用中，這裡應該從數據庫中獲取用戶
    return users;
};

/**
 * 獲取指定 ID 的用戶
 * @param {FastifyRequest} request - Fastify 請求對象
 * @param {FastifyReply} reply - Fastify 回應對象
 */
export const getUserByIdController = async (request, reply) => {
    const { id } = request.params;
    const user = users.find(u => u.id === id);

    if (!user) {
        return reply.code(404).send({ message: '找不到指定的用戶' });
    }

    return user;
};

/**
 * 創建新用戶
 * @param {FastifyRequest} request - Fastify 請求對象
 * @param {FastifyReply} reply - Fastify 回應對象
 */
export const createUserController = async (request, reply) => {
    const { username, email, password, role = 'user' } = request.body;

    // 檢查用戶名是否已存在
    if (users.some(u => u.username === username)) {
        return reply.code(400).send({ message: '用戶名已存在' });
    }

    // 檢查電子郵件是否已存在
    if (users.some(u => u.email === email)) {
        return reply.code(400).send({ message: '電子郵件已存在' });
    }

    // 創建新用戶 (在實際應用中，應該將用戶保存到數據庫)
    const newUser = {
        id: (users.length + 1).toString(),
        username,
        email,
        role
    };

    users.push(newUser);

    return reply.code(201).send(newUser);
}; 