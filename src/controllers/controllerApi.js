const apiGit = require('../services/serviceGit');
const apiFace = require('../services/serviceFace');
const axios = require('axios');

const _ = require('lodash')


module.exports = async function get(req, res, next){
    
    let repoDefault = [];
    let face = []

    try {
        
        //let { name } = req.params
        let { data } = await apiGit.get('/users/john2507',{

            Authorizathion: "token d88b002b8e05cd582add1fb5fac730b1cafd3aa1"

        })

        let { data: repos } = await apiGit.get(`/users/john2507/repos`)

        
        const apiFace = await axios.get(`https://graph.facebook.com/v5.0/me?fields=id%2Cname%2Cemail%2Caddress%2Cgender%2Clast_name%2Cbirthday%2Cpicture&access_token=EAAIlDuHv2RsBAHFzWMsyIIrUE4YMsZAAOj4yPIdGLo9YejdfJYcRZBSX9RteDfUaxiXduZB2Nb1kJ1VYVszFc8Q1CVPo3kmx4YHyVxwLrfuIFZA0LLgSMZB9woZCToRX1iJ8HYu1hZC73pBUa85aUGdcJYryG9vmdh2Vh66PX8vZAQR1ZBjRGZB27H0O12SmL31QwDH149RoyNXTZAucFgsnhswNp7i23hOELQtpZBBlzESeYgZDZD"`);

        const { id, name, last_name, birthday, gender, email, picture } = apiFace.data;
       
        const profile = {
            id,
            name,
            last_name,
            birthday,
            gender,
            email,
            picture,
          };
    
        repos.map(r => {
            repoDefault.push({
                size: r.size,
                name: r.name,
                url: r.url,
            })
        })
        
        repoDefault.sort((a, b) => {
            return b.size - a.size
        })

        const repoArr = _.chunk(repoDefault, 3)


        return res.json({ facebook_profile:[profile],
            github_profile: {
            name: data.name,
            url: data.url,
            bio: data.bio,
            company: data.company,
            repositorios: [...repoArr[0]],
            
        }})


    } catch (error) {
        console.log(error)
        res.send({haha:"Erro"})
    }
}