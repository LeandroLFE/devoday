const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');
const exphbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USUARIO,
        pass: process.env.EMAILS
    }
});
transporter.use('compile', exphbs({
    viewEngine: {
        extName: '.hbs',
        partialsDir: 'views/emails',
        layoutsDir: 'views/emails',
        defaultLayout: ''
    },
    viewPath: 'views/emails',
    extName: '.hbs'
}));

function enviarEmail(us, assunto, template, variaveis) {
    transporter.sendMail({
        from: process.env.USUARIO,
        to: us,
        subject: assunto,
        template: template,
        context: variaveis
    })
}

let imagens = ['cordeiro', 'coelho'];

function userIcon(vari, page, res) {
    for (let x = 0; x <= imagens.length; x++) {
        if (vari.ima == 0) {
            return res.render(page)
        } else if (vari.ima == x) {
            return res.render(page, {
                imagem: imagens[x-1]
            })
        }
    }
}

// REGISTRAR
exports.register = async (req, res) => {
    const { email, senha, icone } = req.body;
    
    let usuarios = await prisma.Users.findMany({select: {
            email: true,
            senha: true,
            verify: true
        }, where: {
            email: email
        }
    })

    if (usuarios.length > 0) {
        if (usuarios[0].verify == 0) {
            if (await bcrypt.compare(senha, usuarios[0].senha)) {
                res.render('verificação', {
                    emailenv: email
                });
            } else {
                res.render('cadastro', {
                    message: 'Conta não verificada com senha incorreta'
                });
            }
        } else {
            res.render('cadastro', {
                message: 'Este email já está cadastrado e verificado'
            });
        }
    } else {
        let code = Math.floor((Math.random() * (9999-1111)) +1111);
        let hashedPassword = await bcrypt.hash(senha, 8);

        enviarEmail(email, "Verificação de usuário", "verificação", {code: code});

        await prisma.Users.create({data: {
            email,
            senha: hashedPassword,
            token: code,
            icon: parseInt(icone)
        }})
        res.render('verificação', {
            emailenv: email
        });
    }
}

// VERIFICAR CONTA
exports.verificar = async (req, res) => {
    const { codeE, emaile } = req.body;

    let usuarios = await prisma.Users.findMany({select: {
        email: true,
        icon: true,
        token: true
        }, where: {
            email: emaile
        }
    })

    if (codeE == usuarios[0].token) {
        await prisma.Users.update({where: { 
            email: emaile 
            }, data: { 
                verify: 1 
            }
        })

        const createTokens = (user) => {
            const acessToken = sign({ username: user, ima: usuarios[0].icon }, process.env.TOKEN);
            return acessToken;
        }
        const accessToken = createTokens(usuarios[0].email)

        res.cookie('access-token', accessToken, {
            maxAge: 60*60*24*7*1000
        })

        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        
        userIcon(usuarioCookie, 'index', res);
    } else {
        res.render('verificação', {
            message: "Código de verificação inválido, tente novamente"
        })
    }
};

// LOGAR
exports.login = async (req, res) => {
    const { email, senha } = req.body;

    let usuarios = await prisma.Users.findMany({select: {
        email: true,
        senha: true,
        icon: true,
        verify: true
        }, where: {
            email: email
        }
    })

    if (usuarios.length > 0) {
        if (await bcrypt.compare(senha, usuarios[0].senha)) {
            if (usuarios[0].verify == 0) {
                res.render('verificação', {
                    emailenv: email
                });
            } else {
                const createTokens = (user) => {
                    const acessToken = sign({ username: user, ima: usuarios[0].icon }, process.env.TOKEN);
                    return acessToken;
                }
                const accessToken = createTokens(usuarios[0].email)
                
                res.cookie('access-token', accessToken, {
                    maxAge: 60*60*24*7*1000
                })
                
                var usuarioCookie = verify(accessToken, process.env.TOKEN);
                userIcon(usuarioCookie, 'index', res);
            }
        } else {
            res.render('login', {
                message: 'Senha incorreta'
            })
        }

    } else {
        res.render('login', {
            message: 'Não existe conta com este email'
        })
    }
}

exports.avaliar = (req, res) => {
    const { problema, ItensProblema, descrição } = req.body;
    const acessToken = req.cookies["access-token"]
    var usuarioCookie = verify(acessToken, process.env.TOKEN);

    if (problema == "Outros" || problema == "Sugestão") {
        enviarEmail([process.env.USUARIO, usuarioCookie.username], "Feedback", "feedback", {problema: problema, descricao: descrição});

    } else if (problema == undefined) {
        enviarEmail([process.env.USUARIO, usuarioCookie.username], "Feedback", "feedback", {descricao: descrição});

    } else {
        enviarEmail([process.env.USUARIO, usuarioCookie.username], "Feedback", "feedback", {problema: problema, ItensProblema: ItensProblema, descricao: descrição});
    }

    userIcon(usuarioCookie, 'index', res);
}

exports.alterar = async (req, res) => {
    const {emailIemailant, emailIemail, emailIsenha} = req.body;
    const {senhaIemail, senhaIsenhaant, senhaIsenha} = req.body;
    const {deletarIemail, deletarIsenha} = req.body;
    const {icone} = req.body;

    if (emailIemailant && emailIemail && emailIsenha) {

        let usuarios = await prisma.Users.findMany({select: {
            senha: true
            }, where: {
                email: emailIemailant
            }
        })

        let usuariosNovo = await prisma.Users.findMany({select: {
            email: true
            }, where: {
                email: emailIemail
            }
        })

        if (emailIemailant == emailIemail) {
            res.render('alterar', {
                message: 'Não é possível alterar para o mesmo email'
            });
        } else if (usuariosNovo.length > 0) {
            res.render('alterar', {
                message: 'Não é possível alterar para um email pertencente a outra conta'
            });
        } else if (!await bcrypt.compare(emailIsenha, usuarios[0].senha)) {
            res.render('alterar', {
                message: 'Senha incorreta'
            });
        } else {
            let code = Math.floor((Math.random() * (9999-1111)) +1111);
            await prisma.Users.update({where: { 
                email: emailIemailant 
                }, data: { 
                    verify: 0,
                    token: code,
                    email: emailIemail,
                }
            })
            enviarEmail([emailIemailant, emailIemail], 'Verificação de novo email', 'reverificação', {code: code})
            res.clearCookie('access-token')
            res.render('verificação', {
                message: 'Verifique seu novo email',
                emailenv: emailIemail
            });
        }

    } else if (senhaIemail && senhaIsenhaant && senhaIsenha) {
        let usuarios = await prisma.Users.findMany({select: {
            senha: true
            }, where: {
                email: senhaIemail
            }
        })

        if (!await bcrypt.compare(senhaIsenhaant, usuarios[0].senha)) {
            res.render('alterar', {
                message: 'A senha não corresponde ao usuário'
            });
        } else if (senhaIsenhaant == senhaIsenha) {
            res.render('alterar', {
                message: 'Não é possível alterar para a mesma senha'
            });
        } else {
            await prisma.Users.update({where: { 
                email: senhaIemail 
                }, data: { 
                    senha: await bcrypt.hash(senhaIsenha, 8)
                }
            })
            res.clearCookie('access-token')
            res.render('login', {
                message: 'Senha alterada com sucesso!'
            });
        }

    } else if (deletarIemail && deletarIsenha) {
        let usuarios = await prisma.Users.findMany({select: {
            email: true,
            senha: true
            }, where: {
                email: deletarIemail
            }
        })

        if (!await bcrypt.compare(deletarIsenha, usuarios[0].senha)) {
            res.render('alterar', {
                message: 'A senha não corresponde ao usuário'
            });
        } else {
            await prisma.Users.delete({
                where: {
                  email: deletarIemail,
                },
            })
            enviarEmail(deletarIemail, "Conta excluída com sucesso", "delete", {conta: deletarIemail});
            res.clearCookie('access-token');
            res.render('landing');
        }

    } else if (icone) {
        const acessToken = req.cookies["access-token"];
        var usuarioCookie = verify(acessToken, process.env.TOKEN);
        await prisma.Users.update({where: { 
                email: usuarioCookie.username
            }, data: { 
                icon: parseInt(icone)
            }
        })
        for (let x = 0; x <= imagens.length; x++) {
            if (parseInt(icone) == 0) {
                return res.render('index')
            } else if (parseInt(icone) == x) {
                return res.render('index', {
                    imagem: imagens[x-1]
                })
            }
        }

    } else {
        res.render('alterar', {
            message: 'Escolha e preencha corretamente'
        });
    }
}

exports.sair = (req, res) => {
    res.clearCookie("access-token")
    res.render('landing')
}