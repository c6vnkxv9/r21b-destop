import fs from 'fs/promises';
import path from 'path';

/**
 * 從JS文件中提取導出對象
 * @param {string} content - 文件內容
 * @returns {Object|Array|null} - 提取的對象
 */
function extractExportFromJs(content) {
    try {
        // 尋找 export default 或 module.exports =
        const exportMatch = content.match(/export\s+default\s+(\{[\s\S]*?\}|\[[\s\S]*?\])|module\.exports\s*=\s*(\{[\s\S]*?\}|\[[\s\S]*?\])/);

        if (exportMatch) {
            // 提取JSON部分
            let jsonText = exportMatch[0];
            // 移除 export default 或 module.exports =
            jsonText = jsonText.replace(/export\s+default\s+|module\.exports\s*=\s*/, '');
            // 處理尾部的分號
            jsonText = jsonText.replace(/;$/, '');

            try {
                // 嘗試使用 JSON.parse 解析（適用於純JSON格式）
                return JSON.parse(jsonText);
            } catch (jsonError) {
                // 如果不是有效的JSON，使用Function構造器代替eval
                // 這樣能確保變數作用域隔離，更安全
                const fn = new Function('return ' + jsonText);
                return fn();
            }
        }
        return null;
    } catch (err) {
        console.error('提取導出對象時出錯:', err);
        return null;
    }
}

/**
 * 從文件中讀取數據
 * @param {string} filePath - 文件路徑
 * @returns {Promise<Object|Array|null>} - 文件內容
 */
export async function loadDataFromFile(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        const ext = path.extname(filePath).toLowerCase();

        if (ext === '.json') {
            return JSON.parse(content);
        } else if (ext === '.js') {
            return extractExportFromJs(content);
        } else {
            throw new Error(`不支持的文件類型: ${ext}`);
        }
    } catch (err) {
        console.error(`從文件讀取數據時出錯: ${filePath}`, err);
        return null;
    }
}

/**
 * 從目錄中讀取所有JSON和JS文件
 * @param {string} dirPath - 目錄路徑
 * @returns {Promise<Object>} - 文件名到內容的映射
 */
export async function loadAllDataFromDirectory(dirPath) {
    try {
        const files = await fs.readdir(dirPath);
        const result = {};

        for (const file of files) {
            const filePath = path.join(dirPath, file);
            const stat = await fs.stat(filePath);

            if (stat.isFile()) {
                const ext = path.extname(file).toLowerCase();
                if (ext === '.json' || ext === '.js') {
                    const basename = path.basename(file, ext);
                    result[basename] = await loadDataFromFile(filePath);
                }
            }
        }

        return result;
    } catch (err) {
        console.error(`從目錄讀取數據時出錯: ${dirPath}`, err);
        return {};
    }
} 