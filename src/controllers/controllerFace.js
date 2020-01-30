require('dotenv').config();
const axios = require('axios');

module.exports = {
  async show(req, res) {

    try {
      const apiFace = await axios.get(`https://graph.facebook.com/v5.0/me?fields=id%2Cname%2Cemail%2Caddress%2Cgender%2Clast_name%2Cbirthday%2Cpicture&access_token=EAAIlDuHv2RsBALH8fNRCLhdIFraAJdGTt7FQA2SHbaZBvlVQuTYM0zqCSoymsopqdYWTG8mU2sVvlaB84Xr5Dms2CllXpVjTC3ku4PSdmubJ2H72iE1oMwOnPNuHag6lcC6UXX8pfycvXMNnu7Sz6ttqeZCZA5V3c4Kht8hSb89GpZBq92mZCCr2EZCOgZBBzjKRtyVyk91IAZDZD`);
      
      
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

      return res.json(profile);
    }
    catch (err) {
      console.error('ERROR: Problemas com o a Aplicação!');
    }
  }
}