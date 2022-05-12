import * as ResourcePool from 'ts-resource-pool'
import * as puppeteer from 'puppeteer'



/**
 * Step 1 - Create pool using a factory object
 */
const factory = {
  async create () {
    console.log('creating browser')
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    return browser.newPage()
  },
  destroy (page) {
    console.log('closing browser')
    return page.browser().close()
  }
}

export const Pool = new ResourcePool(factory, 5);
