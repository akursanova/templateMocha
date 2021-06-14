import chai from 'chai';
import {goto, run, stop} from './framework/lib/browser';

const {expect} = chai;
describe('homework suite', () => {
  let page;
  beforeEach(async () => {
    await run();
    page = await goto('http://demo.testfire.net/index.jsp');
  })
  afterEach(async () => {
    await stop();
  })
  it('login test for admin', async() => {
    await page.click('tbody > tr > td > #LoginLink > font');
    await page.fill('table #uid', 'admin');
    await page.fill('table #passw', 'admin');
    await page.click('table > tbody > tr:nth-child(3) > td > input');
    const message = ('body > table:nth-child(4) > tbody > tr > td:nth-child(2) > div > h1');
    const messageText = await page.textContent(message);
    expect('Hello Admin User\n\t\t  ').to.have.string(messageText);
  })
    it('login test for user', async() => {
      await page.click('tbody > tr > td > #LoginLink > font');
      await page.fill('table #uid', 'jsmith');
      await page.fill('table #passw', 'demo1234');
      await page.click('table > tbody > tr:nth-child(3) > td > input');
      const message = ('body > table:nth-child(4) > tbody > tr > td:nth-child(2) > div > h1');
      const messageText = await page.textContent(message);
      expect('Hello John Smith\n\t\t  ').to.have.string(messageText);


  })
})