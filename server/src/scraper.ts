import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import https from 'https';
import { nanoid } from 'nanoid';
import { writeFile } from 'fs';

interface RegistryGift {
  storeID: number;
  categories: string[];
  title: string;
  price: number;
  contributable: boolean;
  wants: number;
  has: number;
  image: string;
  productPage: string;
}

type RegistryGifts = RegistryGift[];

const getHtml = async (hostname: string, path: string): Promise<string> =>
  new Promise((resolve, reject) => {
    https
      .get(
        {
          hostname,
          path,
          method: 'GET'
        },
        (res) => {
          let html = '';
          res.on('data', function (chunk) {
            html += chunk;
          });
          res.on('end', function () {
            resolve(html);
          });
        }
      )
      .on('error', (error) => {
        console.error(error);
        reject(error);
      });
  });

const getAmazonRegistry = async () => {
  const id = nanoid(4);
  console.time('Amazon' + id);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.amazon.com/wedding/share/stoltewedding2023', {
    waitUntil: 'networkidle2'
  });

  console.log('page loaded');

  const isElementVisible = async (
    page: puppeteer.Page,
    cssSelector: string
  ) => {
    let visible = true;
    await page
      .waitForSelector(cssSelector, { visible: true, timeout: 2000 })
      .catch(() => {
        visible = false;
      });
    return visible;
  };

  let loadMoreVisible = await isElementVisible(page, '.wedding-see-more__btn');
  while (loadMoreVisible) {
    await page.click('.wedding-see-more__btn').catch(() => {});
    loadMoreVisible = await isElementVisible(page, '.wedding-see-more__btn');
  }

  const attrCollector = async (html: string): Promise<RegistryGift> => {
    const $ = cheerio.load(html);

    const title = $('.registry-asin-card__product-title').text();
    const image = $('.registry-asin-card__img').attr('src') ?? '';
    const price =
      Number($('.wedding__text--price span').text().replace(',', '') || '0') +
      Number($('.wedding__text--price span sup:last-child').text() || '0') /
        100;
    const wants = Number(
      $('.registry-asin-card__bottom-left-text')
        .text()
        .replace(/[^0-9]/g, '')
    );
    const contributable =
      $('.registry-asin-card__bottom-right--text').text() === 'Contribute';
    let productPage = $('.registry-asin-card__link').attr('href') ?? '';
    productPage = productPage.slice(0, productPage.indexOf('?')).toLowerCase();

    let categories: string[] = [];
    if (!productPage.includes('javascript')) {
      const productPageHtml = await getHtml('www.amazon.com', productPage)
        .then((data) => data)
        .catch(() => '');

      const $2 = cheerio.load(productPageHtml);

      $2('#wayfinding-breadcrumbs_feature_div a').each((_, a) =>
        categories.push(
          $2(a)
            .text()
            .replace(/\\n/g, '')
            .replace(/\s{2,}/g, '')
        )
      );
    }

    const gift: RegistryGift = {
      storeID: 2,
      categories: categories.slice(0, 1),
      title: title.slice(0, 5),
      price,
      wants,
      has: 0,
      contributable,
      image: image.slice(0, 5),
      productPage: (productPage.includes('javascript')
        ? 'https://www.amazon.com/wedding/share/stoltewedding2023'
        : `https://www.amazon.com${productPage}`
      ).slice(0, 5)
    };

    return gift;
  };

  const cards: string[] = await page.$$eval('.registry-asin-card', (cards) =>
    cards.map((card) => card.outerHTML)
  );

  console.log('closing browser');
  await browser.close();

  const gifts: RegistryGifts = await Promise.all(
    cards.map((c) => attrCollector(c))
  ).catch(() => []);

  console.timeEnd('Amazon' + id);
  return gifts;
};

const getCrateAndBarrelRegistry = async () => {
  const id = nanoid(4);
  console.time('crateAndBarrel' + id);

  const html = await getHtml(
    'www.crateandbarrel.com',
    '/gift-registry/bianca-garza-and-michael-stolte/r6494306'
  )
    .then((data) => data)
    .catch(() => '');
  if (!!!html) return [];

  const $ = cheerio.load(html);

  let shareables: string[] = [];
  $('.carousel-item-img').each((_, container) => {
    const text = $(container).attr('src') ?? '';
    shareables.push(text.slice(0, text.indexOf('$web')));
  });

  const attrCollector = async (
    container: cheerio.Element
  ): Promise<RegistryGift> => {
    const image =
      $(container).find('.list-item-thumbnail img').attr('src') ?? '';
    const title = $(container).find('.list-item-title-button').text();
    const sku = $(container)
      .find('.list-item-sku span')
      .text()
      .replace(/[^0-9]/g, '');

    const productPage = `/${title
      .replace(/[®",]/g, '')
      .replace(/&/g, '-and-')
      .replace(/\s/g, '-')
      .replace(/-{2,}/g, '-')}/s${sku}`.toLowerCase();

    const productPageHtml = await getHtml(
      'www.crateandbarrel.com',
      productPage.toLowerCase()
    )
      .then((data) => data)
      .catch(() => '');

    const $2 = cheerio.load(productPageHtml);
    let categories: string[] = [];
    $2('.breadcrumb-list .text-xs').each((_, a) =>
      categories.push($2(a).text())
    );

    const price = Number(
      $(container).find('.list-item-price').first().text().replace(/[$,]+/g, '')
    );

    const wants = Number(
      $(container).find('.item-wants').text().replace(/[^\d]/g, '')
    );

    const has = Number(
      $(container).find('.item-has').text().replace(/[^\d]/g, '')
    );

    const gift: RegistryGift = {
      storeID: 1,
      categories: categories.slice(0, 1),
      title: title.slice(0, 5),
      price,
      wants,
      has,
      contributable: shareables.some((s) => image.startsWith(s)),
      image: image.slice(0, 5),
      productPage: `https://www.crateandbarrel.com${productPage}`.slice(0, 5)
    };

    return gift;
  };

  let promises: Promise<RegistryGift>[] = [];

  $('.list-item-container').each((_, container) =>
    promises.push(attrCollector(container))
  );

  const gifts: RegistryGifts = await Promise.all(promises).catch(() => []);

  console.timeEnd('crateAndBarrel' + id);
  return gifts;
};

const getBedBathAndBeyondRegistry = async () => {
  const id = nanoid(4);
  console.time('bedbathbeyond' + id);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    'https://www.bedbathandbeyond.com/store/giftregistry/viewregistryguest/551415067?selectedRLVFilters=_recommended',
    {
      waitUntil: 'networkidle2'
    }
  );

  const html = await page.content();
  if (!!!html) return [];

  const $ = cheerio.load(html);

  writeFile('html.txt', html, 'utf-8', () => console.log('wrote file'));

  const attrCollector = async (
    container: cheerio.Element
  ): Promise<RegistryGift> => {
    console.log('here');
    const image = $(container).find('img').attr('src') ?? '';
    const title = $(container).find('.list-item-title-button').text();
    const sku = $(container)
      .find('.list-item-sku span')
      .text()
      .replace(/[^0-9]/g, '');

    const productPage = `/${title
      .replace(/[®",]/g, '')
      .replace(/&/g, '-and-')
      .replace(/\s/g, '-')
      .replace(/-{2,}/g, '-')}/s${sku}`.toLowerCase();

    const productPageHtml = await getHtml(
      'www.crateandbarrel.com',
      productPage.toLowerCase()
    )
      .then((data) => data)
      .catch(() => '');

    const $2 = cheerio.load(productPageHtml);
    let categories: string[] = [];
    $2('.breadcrumb-list .text-xs').each((_, a) =>
      categories.push($2(a).text())
    );

    const price = Number(
      $(container).find('.list-item-price').first().text().replace(/[$,]+/g, '')
    );

    const wants = Number(
      $(container).find('.item-wants').text().replace(/[^\d]/g, '')
    );

    const has = Number(
      $(container).find('.item-has').text().replace(/[^\d]/g, '')
    );

    const gift: RegistryGift = {
      storeID: 1,
      categories: categories.slice(0, 1),
      title: title.slice(0, 5),
      price,
      wants,
      has,
      contributable: false, //shareables.some((s) => image.startsWith(s)),
      image: image.slice(0, 5),
      productPage: `https://www.crateandbarrel.com${productPage}`.slice(0, 5)
    };

    return gift;
  };

  let promises: Promise<RegistryGift>[] = [];
  console.log(
    'item',
    $('div.GuestViewerLayout-inline_7qKC').attr('data-locator')
  );
  await $('div[data-locator=guestViewItemsSection]')
    .find('.grid-x')
    .each((_, container) => promises.push(attrCollector(container)));

  const gifts: RegistryGifts = await Promise.all(promises).catch(() => []);

  console.timeEnd('bedbathbeyond' + id);
  return gifts;
};

// https://www.bedbathandbeyond.com/store/giftregistry/viewregistryguest/551415067?eventType=Wedding

console.log('running');
console.time('topLevel');
Promise.all([
  // getCrateAndBarrelRegistry(),
  // getAmazonRegistry(),
  getBedBathAndBeyondRegistry()
]).then((results) => {
  const gifts = results.flat().filter((g) => g.wants > 0);
  console.timeEnd('topLevel');
  console.table(gifts);
});
