# komikcast scraper
easy way to scrape komikcast.me

## How to use
well its easy.

1. clone this repo
   ```sh
   git clone https://github.com/xct007/komikcast-scraper.git

    or

   just copy the source code
   ```
2. Example
   ```js
    const {
        Info,
        Latest,
        Search
    } = require('./index.js')

    // Get latest comic update

    Latest().then(async(data) => {console.log(data)})


    /*
    can be complete link url

    eg. https://komikcast.me/komik/im-an-evil-god/
    eg. https://komikcast.me/komik/im-an-evil-god-chapter-270-bahasa-indonesia/

    OR just LinkId

    eg. im-an-evil-god
    eg. im-an-evil-god-chapter-270-bahasa-indonesia
    */

    // Get info comic

    Info('https://komikcast.me/komik/im-an-evil-god/').then(async(data) => {console.log(data)})

    // Get comic chapter

    Info('im-an-evil-god-chapter-270-bahasa-indonesia').then(async(data) => {console.log(data)})

   ```
3. And voila our beloved komikcast.me admins will be furious with you and me.
## How it works
Its directly send GET request to they own api that return JSON.
 - The url for request is not __https://komikcast.me/__ but __https://apk.nijisan.my.id/__
    - API router
        - Fetch latest comic
          - _https://apk.nijisan.my.id/premium/home/latest/1/1_
        - Search comic
          - _https://apk.nijisan.my.id/komik/search/{query}/1/1_
        - Get info comic
          - Depends on request
            - Get comic info
              - _https://apk.nijisan.my.id/komik/info/{linkId}_
            - Get comic chapter info
              - _https://apk.nijisan.my.id/komik/baca/{LinkId}_
# Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue.
Don't forget to give the project a star! Thanks again!

1. Fork the Repo
2. Commit your Changes
3. Push to the Branch
4. Open a Pull Request

## Contact
David - [@david.stefen](https://instagram.com/david.stefen)
