const express = require('express');

const app = express();

app.listen(8000, () => {
    console.log('Server started!');
  });


  app.route('/api/authorize').get((req, res) => {

    var request = require('request'); // "Request" library
    var client_id = process.env.client_id; // Your client id
    var client_secret = process.env.client_secret; // Your secret

    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
          grant_type: 'client_credentials'
        },
        json: true
    };

    var AuthReponse = request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(response.body);
          // use the access token to access the Spotify Web API
          return response.body;
        } else {
            console.log(error);
            return error;
        }
      });

    res.send(
        AuthReponse
    );
  });