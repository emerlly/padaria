const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors());
app.use(express.json());

let pedidos = [];

app.post("/pedidos", (req, res) => {
    try {
        const newPedido = { ...req.body, id: pedidos.length + 1 }; // Atribui um ID único
        pedidos.push(newPedido);
        res.status(201).send('Pedido criado com sucesso!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao criar pedido');
    }
});

app.delete("/pedidos/:id", (req, res) => {
    const id = parseInt(req.params.id); // Garantindo que o ID é um número
    const pedidoIndex = pedidos.findIndex(p => p.id === id); // Verifica se o pedido existe

    if (pedidoIndex === -1) {
        return res.status(404).send('Pedido não encontrado'); // Retorna 404 se não encontrado
    }

    try {
        pedidos.splice(pedidoIndex, 1); // Remove o pedido do array
        res.status(200).send('Pedido removido com sucesso!'); // Resposta de sucesso
    } catch (error) {
        console.error(error); // Log do erro
        res.status(500).send('Erro ao remover pedido'); // Resposta de erro
    }
});

app.get("/pedidos/:id", (req, res) => {
    const id = parseInt(req.params.id); // Garantindo que o ID é um número
    const pedido = pedidos.find(p => p.id === id); // Verifica se o pedido existe

    if (!pedido) {
        return res.status(404).send('Pedido não encontrado'); // Retorna 404 se não encontrado
    }

    res.send(pedido); // Retorna o pedido encontrado
});

app.get("/pedidos", (req, res) => {
    res.send(pedidos);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
