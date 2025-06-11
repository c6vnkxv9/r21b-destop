import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { loadAllDataFromDirectory, loadDataFromFile } from '../utils/dataLoader.js';

// 獲取當前文件的目錄
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 數據文件路徑
const dataDir = join(__dirname, '../data');
const scriptPath = join(dataDir, 'script.js');
const charactersPath = join(dataDir, 'characters.js');
const colorListPath = join(dataDir, 'colorList.json');
const exchangeSettingPath = join(dataDir, 'exchangeSetting.json');
const pairIconListPath = join(dataDir, 'pairIconList.js');

/**
 * 獲取所有數據
 * @param {FastifyRequest} request - Fastify 請求對象
 * @param {FastifyReply} reply - Fastify 回應對象
 */
export const getAllDataController = async (request, reply) => {
    try {
        const allData = await loadAllDataFromDirectory(dataDir);
        return allData;
    } catch (err) {
        console.error('獲取所有數據時出錯:', err);
        return reply.code(500).send({ error: '獲取數據時發生錯誤' });
    }
};

/**
 * 獲取腳本數據
 * @param {FastifyRequest} request - Fastify 請求對象
 * @param {FastifyReply} reply - Fastify 回應對象
 */
export const getScriptController = async (request, reply) => {
    try {
        const script = await loadDataFromFile(scriptPath);
        if (!script) {
            return reply.code(404).send({ error: '找不到腳本數據' });
        }
        return script;
    } catch (err) {
        return reply.code(500).send({ error: '獲取腳本數據時發生錯誤' });
    }
};

/**
 * 獲取角色數據
 * @param {FastifyRequest} request - Fastify 請求對象
 * @param {FastifyReply} reply - Fastify 回應對象
 */
export const getCharactersController = async (request, reply) => {
    try {
        const characters = await loadDataFromFile(charactersPath);
        if (!characters) {
            return reply.code(404).send({ error: '找不到角色數據' });
        }
        return characters;
    } catch (err) {
        return reply.code(500).send({ error: '獲取角色數據時發生錯誤' });
    }
};

/**
 * 獲取顏色列表
 * @param {FastifyRequest} request - Fastify 請求對象
 * @param {FastifyReply} reply - Fastify 回應對象
 */
export const getColorListController = async (request, reply) => {
    try {
        const colorList = await loadDataFromFile(colorListPath);
        if (!colorList) {
            return reply.code(404).send({ error: '找不到顏色列表' });
        }
        return colorList;
    } catch (err) {
        return reply.code(500).send({ error: '獲取顏色列表時發生錯誤' });
    }
};

/**
 * 獲取交換設置
 * @param {FastifyRequest} request - Fastify 請求對象
 * @param {FastifyReply} reply - Fastify 回應對象
 */
export const getExchangeSettingController = async (request, reply) => {
    try {
        const exchangeSetting = await loadDataFromFile(exchangeSettingPath);
        if (!exchangeSetting) {
            return reply.code(404).send({ error: '找不到交換設置' });
        }
        return exchangeSetting;
    } catch (err) {
        return reply.code(500).send({ error: '獲取交換設置時發生錯誤' });
    }
};

/**
 * 獲取配對圖標列表
 * @param {FastifyRequest} request - Fastify 請求對象
 * @param {FastifyReply} reply - Fastify 回應對象
 */
export const getPairIconListController = async (request, reply) => {
    try {
        const pairIconList = await loadDataFromFile(pairIconListPath);
        if (!pairIconList) {
            return reply.code(404).send({ error: '找不到配對圖標列表' });
        }
        return pairIconList;
    } catch (err) {
        return reply.code(500).send({ error: '獲取配對圖標列表時發生錯誤' });
    }
}; 