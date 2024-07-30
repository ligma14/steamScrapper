import axios from 'axios';
import * as cheerio from 'cheerio';

export const buildProductJSON = () => {
    // Parse the steam top 10 popular
    let dataArray = [{
      "id": 0, 
      "quality": "",
      "name": "", 
      "buyInfo": '',
      "sellInfo": '',
      "description": "", 
      "picUrl": "", 
      "itemLink": ""
      }];

    const response = axios.get('https://steamcommunity.com/market/search/render/?query=&start=0&count=2&norender=1')
    .then((response)=>{
      let $ = response.data.results;
  
      for (let i = 0; i < $.length ;i++){
        dataArray[i].itemLink = encodeURI($[i].name) 
        let appID = $[i].asset_description.appid;
    
        dataArray[i].id = i;
        dataArray[i].quality = $[i].asset_description.background_color; 
        dataArray[i].name = $[i].name;
        dataArray[i].sellInfo = $[i].sell_price_text;
        let urlQuerry = `https://steamcommunity.com/market/listings/${appID}/${dataArray[i].itemLink}`;
  
        switch (dataArray[i].quality) {
          case '3C352E':
            dataArray[i].quality = 'q-legendary'
            break;
        
          default:
            dataArray[i].quality = 'q-common'
            break;
        }
        
        // Parse the product page
        axios.get(urlQuerry).then((response) => {
          console.log('response number is:',i,'and the status is',response.status);
          let ch = cheerio.load(response.data);
          
          dataArray[i].picUrl = ch('.market_listing_largeimage').children('img').eq(0).attr('src')!;
        });
      }
      console.log(dataArray)
      localStorage.setItem('cachedProducts', JSON.stringify(dataArray));
      return dataArray;
    }, (error) => {
      console.log('Error generating Highlights section (buildProductJSON function):', error);

      const cachedProducts = localStorage.getItem('cachedProducts');
      if (cachedProducts) {
        return JSON.parse(cachedProducts);
      }
    });
  }