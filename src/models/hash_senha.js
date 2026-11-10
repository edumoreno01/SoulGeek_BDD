// Instale antes: npm install bcrypt
const bcrypt = require('bcrypt');

// Função para criar hash da senha
async function criarHashSenha(senha) {
    if (typeof senha !== 'string' || senha.trim() === '') {
        throw new Error('Senha inválida.');
    }
    const saltRounds = 10; // Mais rounds = mais seguro (mas mais lento)
    return await bcrypt.hash(senha, saltRounds);
}

// Função para verificar senha
async function verificarSenha(senhaDigitada, hashArmazenado) {
    return await bcrypt.compare(senhaDigitada, hashArmazenado);
}

/* Exemplo de uso
(async () => {
    const senha = 'MinhaSenhaSegura123!';
    const hash = await criarHashSenha(senha);
    console.log(`Hash armazenado: ${hash}`);

    const loginCorreto = await verificarSenha('MinhaSenhaSegura123!', hash);
    console.log(`Senha correta? ${loginCorreto}`);

    const loginErrado = await verificarSenha('SenhaErrada', hash);
    console.log(`Senha correta? ${loginErrado}`);
})();
*/

module.exports = {
   criarHashSenha,
   verificarSenha
}
