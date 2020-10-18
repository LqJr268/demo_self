// 生成token 解板token
const jwt = require("jwt-simple");
const key = "(*&)(*&^*%&^%$"
module.exports = {
    encode(id,password)
    {// 加密  生成token
        return jwt.encode({
            id,
            password,
            lastTime:(Date.now() + (6000))
        },key)
    }
}