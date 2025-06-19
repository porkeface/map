const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const app = express();
const port = 3000;

// 使用 cors 中间件，允许所有来源
app.use(cors());

// SQL Server 配置
const dbConfig = {
    server: 'JLEE',
    database: 'jimei',
    authentication: {
        type: 'default',    // 认证类型
        options: {
            userName: 'sa',  // SQL Server 登录用户名
            password: '2312001101'  // SQL Server 登录密码
        }
    },
    options: {
        trustServerCertificate: true,
        enableArithAbort: true,
        encrypt: false
    }
};

// 创建连接池
const pool = new sql.ConnectionPool(dbConfig);
const poolConnect = pool.connect()
    .then(() => {
        console.log('数据库连接成功！');
        return pool;
    })
    .catch(err => {
        console.error('数据库连接失败:', err);
        throw err;
    });

app.get('/api/jimei', async (req, res) => {
    try {
        const pool = await poolConnect;
        const request = pool.request();
        const result = await request.query('SELECT * FROM ScenicSpots');
        res.json(result.recordset);
    } catch (err) {
        console.error('SQL执行错误:', err);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/api/jimei`);
});