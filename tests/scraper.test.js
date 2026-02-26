const { test, expect } = require('@playwright/test');

const urls = [
  'https://sanand0.github.io/tdsdata/js_table/?seed=25',
  'https://sanand0.github.io/tdsdata/js_table/?seed=26',
  'https://sanand0.github.io/tdsdata/js_table/?seed=27',
  'https://sanand0.github.io/tdsdata/js_table/?seed=28',
  'https://sanand0.github.io/tdsdata/js_table/?seed=29',
  'https://sanand0.github.io/tdsdata/js_table/?seed=30',
  'https://sanand0.github.io/tdsdata/js_table/?seed=31',
  'https://sanand0.github.io/tdsdata/js_table/?seed=32',
  'https://sanand0.github.io/tdsdata/js_table/?seed=33',
  'https://sanand0.github.io/tdsdata/js_table/?seed=34'
];

test('Scrape and sum all table numbers', async ({ page }) => {
  let grandTotal = 0;

  for (const url of urls) {
    console.log(`Visiting: ${url}`);
    await page.goto(url);
    await page.waitForSelector('table', { timeout: 5000 });

    const cells = await page.$$eval('table td, table th', elements =>
      elements.map(el => el.innerText.trim()).filter(text => text)
    );

    let pageTotal = 0;
    for (const cell of cells) {
      const num = parseFloat(cell.replace(/[^\d.-]/g, ''));
      if (!isNaN(num)) pageTotal += num;
    }

    console.log(`Page ${url} sum: ${pageTotal}`);
    grandTotal += pageTotal;
  }

  console.log(`GRAND TOTAL SUM OF ALL TABLES: ${grandTotal}`);
  expect(grandTotal).toBeGreaterThan(0);
});
// trigger workflow
