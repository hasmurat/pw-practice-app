import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/')
})

test.describe('test suite1', () => {

  test.beforeEach(async ({ page }) => {
    await page.getByText('Forms').click()
  })

  test('the first test', async ({ page }) => {

    await page.getByText('Form Layout').click()

    await page.getByText('Datepicker').click()

  });

})



test.describe('test suite2', () => {

  test.beforeEach(async ({ page }) => {
    await page.getByText('Forms').click()
  })

  test('the second test', async ({ page }) => {

    await page.getByText('Form Layout').click()

    await page.getByText('Datepicker').click()

  });

})