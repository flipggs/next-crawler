import rp  from 'request-promise';
import $ from'cheerio';

import puppeteer from 'puppeteer';

export default async function Home() {
  const url = 'https://investidor10.com.br/acoes/petr4/';

  // const browser = await puppeteer.launch();
  // const page = await browser.newPage();

  // // Navigate the page to a URL
  // await page.goto(url);

  // const data = await page.evaluate(() => {
  //   return {
  //     teste: document.querySelector('#table-indicators .cell')?.innerHTML
  //   }
  // })

  // console.log({ data });

  // await browser.close();

  puppeteer
  .launch()
  .then(function(browser) {
    return browser.newPage();
  })
  .then(function(page) {
    return page.goto(url).then(function() {
      return page.content();
    });
  }).then(function(html) {
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

    console.log({ object });
  })
  .catch(function(err) {
    //handle error
  });


  // rp(url)
  // .then(function(html){
  //   //success!
  //   const body = $.load(html);
  //   const cell = body('#table-indicators .cell');

  //   cell.each(() => {
  //     console.log('--------------------------------------------------------------------------------');
  //     console.log('item', cell.text())
  //   })

  // })
  // .catch(function(err){
  //   console.log({ err });
  // });
  
    

  return (
   <div>
    <h1>teste</h1>
   </div>
  )
}
