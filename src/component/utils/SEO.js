// more info: https://allorigins.win/
const CORS_API_HOST = 'https://api.allorigins.win/get?url=';

async function getMeta(url) {
    return fetch(`${CORS_API_HOST}${encodeURIComponent(url)}`)
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(data => data.contents)
        .then(body => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(body, 'text/html');
            const meta = doc.querySelector('meta[name="description"]');
            const title = doc.querySelector('title');
            const image = doc.querySelector('meta[property="og:image"]');
            const description = meta ? meta.getAttribute('content') : '';
            const titleText = title ? title.textContent : '';
            const imageUrl = image ? image.getAttribute('content') : '';
            const metaData = {
                title: titleText,
                description: description,
                image: imageUrl
            };
            return metaData;
        })
        .catch(console.error);
}

export { getMeta };