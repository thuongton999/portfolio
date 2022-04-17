import { getMeta } from './SEO';

async function getWorks(works) {
    try {
        const metaData = await Promise.all(works.map(work => getMeta(work.url)));
        return metaData.map((meta, index) => ({
            ...works[index],
            ...meta,
        }));
    } catch (error) {
        console.log(error);
    }
}

async function getPopularPosts(postsUrl) {
    try {
        const metaData = await Promise.all(postsUrl.map(url => getMeta(url)));
        return metaData.map((meta, index) => ({
            url: postsUrl[index],
            ...meta
        }));
    } catch (message) {
        return console.error(message);
    }
}

export { getWorks, getPopularPosts };