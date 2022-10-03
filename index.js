const axios = require('axios');

function URL_PARSE(url) {
    let result;
    try {
        result = url.match(/\/komik\/(.*)\//)[1]
    } catch (_error) {
        result = false
    } finally {
        return result
    }
}

async function Latest() {
    return new Promise(async (resolve, reject) => {
        let Data = []
        let status;
        try {
            await axios.request({
                url: "https://apk.nijisan.my.id/premium/home/latest/1/1",
                method: "GET",
                headers: {
                    "User-Agent": "okhttp/4.9.3"
                }
            }).then( ( { data } ) => {
                let Fix = data.data
                for (let i of Fix) {
                  Data.push({
                      title: i.title,
                      ch: i.ch,
                      type: i.type,
                      rating: i.rating,
                      image: i.image,
                      image2: i.image2,
                      link: i.link
                  })
                }
                status = true
            })
        } catch (_error) {
            status = false
        } finally {
            if (status == false) {
                reject(false)
            }
            resolve(Data)
        }
    })
}

async function Info(url) {
    return new Promise(async(resolve, reject) => {
        let Data, status, passed, parse, type;
        if (url.match(/http?s:\/\//)) {
            parse = URL_PARSE(url)
            if (parse.includes('chapter')) {
                type = 0
                passed = "https://apk.nijisan.my.id/komik/baca/" + parse
            } else {
                type = 1
                passed = "https://apk.nijisan.my.id/komik/info/" + parse
            }
        } else {
            if (url.match(/chapter/)) {
                type = 0
                passed = "https://apk.nijisan.my.id/komik/baca/" + url
            } else {
                type = 1
                passed = "https://apk.nijisan.my.id/komik/info/" + url
            }
        }
        try {
            await axios.request({
                url: passed,
                method: "GET",
                headers: {
                    "User-Agent": "okhttp/4.9.3"
                }
            }).then( ( { data } ) => {
                if (type == 0) {
                    Data = {
                        title: data.comic_title,
                        chapter: data.ch,
                        prev_ch: data.prev_ch || false,
                        next_ch: data.next_ch || false,
                        images: data.images
                    }
                    status = true
                } else if (type == 1) {
                    let list_chapter = []
                    for (let i of data.list_chapter) {
                        list_chapter.push({
                            chapter: i.ch,
                            time_release: i.time_release,
                            link: 'https://komikcast.me/komik/' + i.linkId + '/',
                            linkId: i.linkId
                        })
                    }
                    Data = {
                        link: url,
                        title: data.title,
                        title_other: data.title_other,
                        author: data.author,
                        image: data.image,
                        image2: data.image2,
                        rating: data.rating ,
                        sinopsis: data.sinopsis,
                        type: data.type.replace(/Type: /g, ''),
                        status: data.status,
                        released: data.released.replace(/\D/g, ''),
                        total_chapter: data.total_chapter,
                        updated_on: data.updated_on,
                        genres: data.genres,
                        list_chapter
                    }
                    status = true
                }

            })
        } catch (_error) {
            console.log(_error)
            status = false
        } finally {
            if (!status) {
                reject(status)
            }
            resolve(Data)
        }
    })
}
async function Search(query) {
    return new Promise(async(resolve, reject) => {
        let Data = [], status;
        try {
            await axios.request({
                url: "https://apk.nijisan.my.id/komik/search/" + query + "/1/1",
                method: "GET",
                headers: {
                    "User-Agent": "okhttp/4.9.3"
                }
            }).then( ( { data } ) => {
                let Fix = data.page
                for (let i of Fix) {
                    Data.push({
                        title: i.title,
                        chapter: i.chapter,
                        rating: i.rating,
                        image: i.image,
                        image2: i.image2,
                        type: i.type,
                        isCompleted: i.isCompleted || false,
                        link: 'https://komikcast.me/komik/' + i.linkId + '/',
                        LinkId: i.linkId
                    })
                }
                status = true
            })
        } catch (_error) {
            status = false
        } finally {
            if (!status) {
                reject(status)
            }
            resolve(Data)
        }
    })
}
module.exports = {
    Info,
    Latest,
    Search
}
