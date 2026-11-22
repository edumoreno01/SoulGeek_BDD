const exigirLogin = (req, res, next) => {
   if (!req.session.usuario) {
      return res.status(401).json({ erro: 'Faça login por favor' });
   }
   next();
};

const exigirAdmin = (req, res, next) => {
   if (!req.session.usuario) {
      return res.status(401).json({ erro: 'Faça login por favor' });
   }
   if (req.session.usuario.perfil !== 'admin'){
    return res.status(403).json({ erro: 'Acesso proibido' });
   }
   next();
};

const exigirProprioOuAdmin = (req, res, next) => {
   if (!req.session.usuario) {
      return res.status(401).json({ erro: 'Faça login por favor' });
   }
   if (req.session.usuario.perfil === 'admin'){
    return next();
   }
   if(req.session.usuario.id === parseInt(req.params.id)){
    return next();
   }
   else{
    return res.status(403).json({ erro: 'Acesso proibido' });
   }
   
};

module.exports = 
{ 
    exigirLogin,
    exigirAdmin,
    exigirProprioOuAdmin
 };