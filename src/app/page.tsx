import $ from'cheerio';

import puppeteer from 'puppeteer';

export default async function Home() {
  const url = 'https://investidor10.com.br/acoes/petr4/';

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto(url);
  const html = await page.content();

  let object = {};
  let key = '';

  $('#table-indicators span', html).each(function() {
    const text = $(this).text(); 
    const textSplited = text.split('\n');

    textSplited.forEach((item) => {
      if (item) {
        const value = item.replaceAll('%', '').replaceAll(',', '.');

        if (isNaN(parseFloat(value))) {
          key = value.trim();
        } 

        object = {
          ...object,
          [key]: isNaN(parseFloat(value)) ? '' : item
        }
      }
    });
  });    

  return (
   <div>
    <h1>Crawler do site</h1>
    <a href={url} target='_blank'>{url}</a>
    <pre>{JSON.stringify(object, null, 2)}</pre>
   </div>
  )
}
