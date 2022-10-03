const {
    Info,
    Latest,
    Search
} = require('./index.js')

Latest().then(async(data) => {console.log(data)})
Info('https://komikcast.me/komik/im-an-evil-god/').then(async(data) => {console.log(data)})
Info('https://komikcast.me/komik/im-an-evil-god-chapter-270-bahasa-indonesia/').then(async(data) => {console.log(data)})
