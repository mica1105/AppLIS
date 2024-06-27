const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models').Usuario;
const Paciente= require('../models').Paciente;
const miClaveSecreta= 'mi clave super secreta para todo';


exports.login = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!usuario) {
            return res.render("./", {
                codigo: 'error',
                mensaje: 'Usuario o contraseña incorrectos'
            });
        }

        const passwordIsValid = await bcrypt.compareSync(
            req.body.password,
            usuario.password
        );

        if (!passwordIsValid) {
            return res.render("./", {
                codigo: 'error',
                mensaje: 'Usuario o contraseña incorrectos'
            });
        }

        const token = jwt.sign({ user: usuario.email }, miClaveSecreta, {
            expiresIn: 86400 // 24 hours
        });

        req.session.usuario = usuario.email;
        req.session.rol = usuario.rolId;
        req.session.token = token;
        if(usuario.rolId==1){
            return res.redirect(301, "/usuarios/");
        }

        if(usuario.rolId==2 || usuario.rolId==3){
            return res.redirect(301, "/ordenes/");
        }
        
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error del servidor');
    }
};


exports.formLogin = async (req, res) => {
    res.render("./login", {
        title: 'Login'
    })
}

exports.loginPacientes = async (req, res) => {
    try {
        const paciente = await Paciente.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!paciente) {
            return res.render("./login", {
                codigo: 'error',
                mensaje: 'Usuario o contraseña incorrectos'
            });
        }

        const passwordIsValid = await bcrypt.compareSync(
            req.body.password,
            paciente.password
        );

        if (!passwordIsValid) {
            return res.render("./login", {
                codigo: 'error',
                mensaje: 'Usuario o contraseña incorrectos'
            });
        }

        const token = jwt.sign({ user: paciente.email }, miClaveSecreta, {
            expiresIn: 86400 // 24 hours
        });

        req.session.usuario = paciente.email;
        req.session.rol = 4;
        req.session.token = token;

        return res.redirect(301, "/pacientes/inicio");
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error del servidor');
    }
};


exports.logout = (req, res) => {
    req.session.destroy();
    res.render("./",{
        codigo:'success',
        mensaje:"Sesion terminada",
    });
}
