# Lab8_Starter

## Check your understanding q's (FILL OUT)
Brian Chen
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)
   - 1: Within a Github action that runs whenever code is pushed 

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.
   - No, because this process involves interaction within the application, which is one of the things unit testing cannot test.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
   - Yes, because testing this does not involve other interactions within the application.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?
   - If we ran the tests with "headless" set to true, we would expect it to run without using teh Chromium browser UI.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?
    ```js
    beforeAll(async () => {
        await page.goto('http://127.0.0.1:5500');
        const settings = await page.$('header > img');
        await settings.click();
        await page.waitForNavigation();
    });
    ```
