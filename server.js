const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Route gốc
app.get('/', (req, res) => {
    res.send('API đang chạy!');
});

// Các route khác (ví dụ: lấy danh sách sản phẩm)
app.get('/products', (req, res) => {
    res.json([
        { id: 1, name: 'Cà phê đen', price: 20000 },
        { id: 2, name: 'Trà sữa', price: 30000 }
    ]);
});

// Lắng nghe cổng
app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});
