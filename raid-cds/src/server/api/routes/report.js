import {Router} from 'express';
import {getToken} from '../auth';
import {getReport, getReportEvents} from '../report';
import qs from 'qs'

const route = Router();

export default (app) => {
  app.use('/reports', route);

  route
  .get('/:code', (req, res) => {
    let {code} = req.params;
    let {fight} = qs.parse(req.query);

    getToken()
      .then(response => {
        let token = response.access_token;

        getReport(code, fight, token)
          .then(r => res.status(200).json(r.reportData.report))
          .catch(error => res.status(400).json(error));
      })
      .catch(error => {
        res.status(400).json(error)
      });
  });

  route.get('/:code/events', async (req, res) => {
    let {code} = req.params;
    let {startTime, endTime} = qs.parse(req.query);

    try {
      const token = await getToken();

     try {
       const events = await getReportEvents(code, startTime, endTime, token.access_token)
       res.status(200).json(events.reportData.report);
     }
     catch (error) {
       console.error('OGAOGAOGAOGOAG');
       console.error(error);
       res.status(500)
     }

    }
    catch (error) {
      console.error(error);
      res.status(500)
    }

      /*.then(r => {
        console.log(r);
        return res.status(200).json(r.reportData.report);
      })
      .catch(error => res.status(400).json(error));

      .then(response => {
        let token = response.access_token;


      })
      .catch(error => {
        console.log(error);
      });*/
  });
}
