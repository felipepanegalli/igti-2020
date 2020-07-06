import express from 'express';
const router = express.Router();
import controller from '../controller/accountController.js';

// Rota de todas as contas
router.get('/', controller.all);

// Rota de depósito
router.post('/deposit', controller.deposit);
// Rota de saque
router.post('/withdraw', controller.withdraw);
// Rota de ver saldo da conta
router.post('/balance', controller.balance);
// Rota de transferência entre contas
router.post('/trasnfer', controller.transfer);
// Rota de exclusão conta
router.delete('/delete-account', controller.deleteAccount);
// Rota para calcular a média das contas
router.post('/average', controller.average);
// Rota de menor saldo em conta da agência
router.post('/find-by-asc', controller.findByAsc);
// Rota de maior saldo em conta da agência
router.post('/find-by-desc', controller.findByDesc);
// Rota que troca as contas de maior valor para uma private
router.get('/private', controller.privateAccounts);

export default router;
