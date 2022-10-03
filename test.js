const {
    Info,
    Latest,
    Search
} = require('./index.js')

// Latest().then(async(data) => {console.log(data)})
//
// // can be complete link url OR just LinkId eg. im-an-evil-god
//
// Info('https://komikcast.me/komik/im-an-evil-god/').then(async(data) => {console.log(data)})
// Info('im-an-evil-god-chapter-270-bahasa-indonesia').then(async(data) => {console.log(data)})
 Search('love').then(async(data) => {console.log(data)})
