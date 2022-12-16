# KOMIKCAST API SCRAPER 

## How to use
1. Install Packages
   ```sh
   npm install github:xct007/komikcast-scraper
   ```
    or using yarn
   ```sh
   yarn add github:xct007/komikcast-scraper
   ```
2. Example
   ```js
    
    // CJS
    const {
        Info,
        Latest,
        Search
    } = require('komikcast-scraper')

    // ESM
    import {
        Info,
        Latest,
        Search
    } from "komikcast-scraper"


    // Get latest comic update

    Latest().then(async(data) => {console.log(data)})


    /*
    Can be complete link url
    eg. https://komikcast.me/komik/im-an-evil-god/
    eg. https://komikcast.me/komik/im-an-evil-god-chapter-270-bahasa-indonesia/


    OR just LinkId
    eg. im-an-evil-god
    eg. im-an-evil-god-chapter-270-bahasa-indonesia
    */

    // Get info comic

    Info('https://komikcast.me/komik/im-an-evil-god/').then((data) => { console.log(data) })

    // Get comic chapter

    Info('im-an-evil-god-chapter-270-bahasa-indonesia').then((data) => { console.log(data) })


    // Search comics
    Search("pico").then((json) => { console.log(json) })
   ```
## How it works
Its directly send GET request to they own api that return JSON.
The url for request is not __https://komikcast.site/__ but __https://apk.nijisan.my.id/__
### API router
- Fetch latest comic
```https://apk.nijisan.my.id/premium/home/latest/1/1```
- Search comic
```https://apk.nijisan.my.id/komik/search/{query}/1/1```
- Get comic info
```https://apk.nijisan.my.id/komik/info/{linkId}```
- Get comic chapter info
```https://apk.nijisan.my.id/komik/baca/{LinkId}```
# Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue.
Don't forget to give the project a star! Thanks again!

1. Fork the Repo
2. Commit your Changes
3. Push to the Branch
4. Open a Pull Request

## Contact
David - [@david.stefen](https://instagram.com/david.stefen)
