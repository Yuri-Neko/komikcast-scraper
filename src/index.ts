import axios from 'axios';
import { domain, parseUrl } from './utils.js';

async function Latest(): Promise<any[]> {
  const result: any[] = [];
  try {
    const { data } = await axios.request({
      url: 'https://apk.nijisan.my.id/premium/home/latest/1/1',
      method: 'GET',
      headers: {
        'User-Agent': 'okhttp/4.9.3',
      },
    });
    for (const i of data.data) {
      result.push({
        title: i.title,
        ch: i.ch,
        type: i.type,
        rating: i.rating,
        image: i.image,
        image2: i.image2,
        link: i.link,
      });
    }
    return result;
  } catch (error: any) {
    return error;
  }
}
async function Search(query: string): Promise<any[]> {
  const result: any[] = [];
  try {
    const { data } = await axios.request({
      url: `https://apk.nijisan.my.id/komik/search/${query}/1/1`,
      method: 'GET',
      headers: {
        'User-Agent': 'okhttp/4.9.3',
      },
    });
    for (const i of data.page) {
      result.push({
        title: i.title,
        chapter: i.chapter,
        rating: i.rating,
        image: i.image,
        image2: i.image2,
        type: i.type,
        isCompleted: i.isCompleted || false,
        link: `https://komikcast.${domain}/komik/${i.linkId}/`,
        LinkId: i.linkId,
      });
    }
    return result;
  } catch (error: any) {
    return error;
  }
}
async function Info(url: string): Promise<any[] | any | boolean> {
  const _a = parseUrl(url);
  if (!_a.passed) {
    return false;
  }
  try {
    const { data } = await axios.request({
      url: _a.url,
      method: 'GET',
      headers: {
        'User-Agent': 'okhttp/4.9.3',
      },
    });
    if (_a.type == 0) {
      return {
        title: data.comic_title,
        chapter: data.ch,
        prev_ch: data.prev_ch || false,
        next_ch: data.next_ch || false,
        images: data.images,
      };
    } else if (_a.type == 1) {
      const result: any[] = [];

      for (const i of data.list_chapter) {
        result.push({
          chapter: i.ch,
          time_release: i.time_release,
          link: `https://komikcast.${domain}/komik/${i.linkId}/`,
          linkId: i.linkId,
        });
      }
      return {
        link: url,
        title: data.title,
        title_other: data.title_other,
        author: data.author,
        image: data.image,
        image2: data.image2,
        rating: data.rating,
        sinopsis: data.sinopsis,
        type: data.type.replace(/Type: /g, ''),
        status: data.status,
        released: data.released.replace(/\D/g, ''),
        total_chapter: data.total_chapter,
        updated_on: data.updated_on,
        genres: data.genres,
        chapters: result,
      };
    }
    return false;
  } catch (error: any) {
    return error;
  }
}
export { Search, Latest, Info };
