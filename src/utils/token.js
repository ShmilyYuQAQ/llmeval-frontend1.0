// src/utils/token.js
export function getUserIdFromToken(token) {
    try {
        if (!token) return null;  // 如果 token 为空，直接返回 null
        
        // 分割 JWT 字符串，获取 payload 部分
        const payloadBase64 = token.split('.')[1];
        
        // Base64Url 解码并兼容 URL 特殊字符
        const decodedPayload = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
        
        // 将解码后的字符串转换为 JSON
        const payload = JSON.parse(decodedPayload);
        
        // 返回 userId
        return payload.userId || null;
    } catch (error) {
        console.error("解析 token 出错:", error);
        return null;
    }
}
