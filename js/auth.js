class AuthUtil {
    static async generateToken(apiKey) {
        try {
            const [id, secret] = apiKey.split('.');
            
            const header = {
                alg: 'HS256',
                sign_type: 'SIGN'
            };
            
            const payload = {
                api_key: id,
                exp: Date.now() + 3600000, // 1小时后过期
                timestamp: Date.now()
            };
            
            // 使用 jwt-encode 库进行编码
            const token = await import('https://cdn.jsdelivr.net/npm/jwt-encode');
            return token.default(payload, secret, { header });
        } catch (error) {
            console.error('Token generation failed:', error);
            throw new Error('Invalid API key format');
        }
    }
} 