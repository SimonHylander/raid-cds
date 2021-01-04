import serialize from 'serialize-javascript'

export * from './report';

export const getTemplate = (assets, markup, state) => {

  return `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Raid CD's</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;500&display=swap" rel="stylesheet"/>
        ${
    assets.client.css
      ? `<link rel="stylesheet" href="${assets.client.css}">`
      : ''
  }
        ${
    process.env.NODE_ENV === 'production'
      ? `<script src="${assets.client.js}" defer></script>`
      : `<script src="${assets.client.js}" defer crossorigin></script>`
  }
    </head>
    <body>
        <div id="root">${markup}</div>
        <script>window.__PRELOADED_STATE__ = ${serialize(state)}</script>
    </body>
</html>`
}
