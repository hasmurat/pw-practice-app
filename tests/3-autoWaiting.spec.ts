import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  await page.goto('http://uitestingplayground.com/ajax');
  await page.getByText('Button Triggering AJAX Request').click();

});

test('auto waiting', async({page}) => {
    const successButton = page.locator('.bg-success')

    // await successButton.click() // default wait süresini bekler
   
    /** 
    await successButton.waitFor( {state: "attached"} )
    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
    */

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test('alternative waits', async({page}) => {
    const successButton = page.locator('.bg-success')

    // // ___ wait for element
    // await page.waitForSelector('.bg-success')


    // //___ wait for particular response
    // await page.waitForResponse('http://uitestingplayground.com/ajax')

    // __wait for network calls to be completed (NOT RECOMMENDED)

    await page.waitForLoadState('networkidle')

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')

})

test('timeouts', async ({page}, testinfo) => {
    test.setTimeout(10000)

    test.slow() // default time 3 katına çıkarır

    testinfo.setTimeout(testinfo.timeout+2000) //default time 2 saniye artırılı

})

