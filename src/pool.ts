import * as ResourcePool from 'ts-resource-pool'
import * as puppeteer from 'puppeteer'

const browserPromise = puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox']
})

/**
 * Step 1 - Create pool using a factory object
 */
const factory = {
  async create () {
    const browser = await browserPromise
    return browser.newPage()
  },
  destroy (page) {
    page.close()
  }
}

export const Pool = new ResourcePool(factory, 5);
