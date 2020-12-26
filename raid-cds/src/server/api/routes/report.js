import {Router} from 'express';
import {getReport} from '../report';
import {getToken} from '../auth';

const route = Router();

export default (app) => {
  app.use('/reports', route);

  route.get('/:code', (req, res) => {
    let { code } = req.params;

    getToken()
      .then(response => {
        let token = response.access_token;

        getReport(code, token)
          .then(r => res.status(200))
          .catch(err => console.log(err));
      })
      .catch(error => {
        res.status(400).json(error)
      });
  })
}