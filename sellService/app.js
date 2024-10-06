const express = require('express');
const axios = require("axios");
const app = express();
const port = 3002;

app.use(express.json());

let orders = [];

// Endpoint para obter todas as vendas
app.get('/sell', (req, res) => {
    res.json(orders); 
});

// Endpoint para criar uma nova venda
app.post('/sell', async (req, res) => {
    const sell = req.body;

    // Verificar se o ID do pedido foi fornecido
    if (!sell.id) {
        return res.status(400).send("ID do pedido é necessário.");
    }

    try {
        // Chamar o endpoint do orderService
        const response = await axios.get(`http://localhost:3001/pedidos/${sell.id}`);
        
        if (response.status === 200) {
            console.log('Pedido encontrado:', response.data);
            //sell.id = orders.length + 1; // Atribuir um novo ID à venda
            orders.push(response.data); // Adicionar a venda ao array
            return res.status(201).json(sell); // Retornar a venda criada
        }
    } catch (error) {
        console.error('Erro ao buscar o pedido:', error.message); // Log do erro
        return res.status(404).send("Pedido não encontrado."); // Retornar erro se o pedido não foi encontrado
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
