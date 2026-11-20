/**
 * IndexNow submission script for xinghuayun.buzz
 * Submits production URLs to Bing IndexNow API
 */
const HOST = 'xinghuayun.buzz';
const KEY = '41e7f3b8902c48f2b1d0932c9e887f42';
const KEY_LOCATION = `https://${HOST}/41e7f3b8902c48f2b1d0932c9e887f42.txt`;

const URL_LIST = [
  `https://${HOST}/`,
  `https://${HOST}/about/`,
  `https://${HOST}/clients/`,
  `https://${HOST}/articles/`,
  `https://${HOST}/articles/clash-airport-client-selection-2026/`,
  `https://${HOST}/articles/clash-node-purchase-guide/`,
  `https://${HOST}/articles/stable-clash-subscription/`,
  `https://${HOST}/articles/clash-verge-airport-guide/`,
  `https://${HOST}/articles/clash-meta-node-guide/`,
  `https://${HOST}/articles/unlimited-device-airport-guide/`,
];

async function submitIndexNow() {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: URL_LIST,
  };

  console.log(`Submitting ${URL_LIST.length} URLs to Bing IndexNow...`);
  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    console.log(`IndexNow Response Status: ${res.status} ${res.statusText}`);
    if (res.status === 200 || res.status === 202) {
      console.log('✅ IndexNow submission successfully dispatched to Bing.');
    } else {
      console.warn(`IndexNow returned status: ${res.status}`);
    }
  } catch (err) {
    console.error('IndexNow submission failed (network or host unreachable):', err.message);
  }
}

submitIndexNow();
