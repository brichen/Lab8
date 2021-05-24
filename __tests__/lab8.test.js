describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });
  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    const entries = await page.$$('journal-entry');
    const first = entries[0];
    await first.click();
    await page.waitForNavigation();
    const url = new URL(page.url());
    expect(url.hash).toBe('#entry1');
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    const title = await page.$('header > h1');
    const code = await page.evaluate(body => body.innerHTML, title);
    await title.dispose();
    expect(code).toBe('Entry 1');
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
    const contents = { 
      title: 'You like jazz?',
      date: '4/25/2021',
      content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
      image: {
        src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
        alt: 'bee with sunglasses'
      }
    };

    const title = await page.$eval('entry-page', (element) => {
      return element.entry.title;
    });
    expect(title).toBe(contents.title);
    
    const date = await page.$eval('entry-page', (element) => {
      return element.entry.date;
    });
    expect(date).toBe(contents.date);

    const content = await page.$eval('entry-page', (element) => {
      return element.entry.content;
    });
    expect(content).toBe(contents.content);

    const source = await page.$eval('entry-page', (element) => {
      return element.entry.image.src;
    });
    expect(source).toBe(contents.image.src);

    const alt = await page.$eval('entry-page', (element) => {
      return element.entry.image.alt;
    });
    expect(alt).toBe(contents.image.alt);
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const body = await page.$('body');
    const bodyClass = await body.getProperty('className');
    const val = await bodyClass.jsonValue();
    expect(val).toBe('single-entry');
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    const settings = await page.$('header > img'); 
    await settings.click();
    await page.waitForNavigation();
    const url = new URL(page.url());
    expect(url.hash).toBe('#settings');
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const title = await page.$('header > h1');
    const code = await page.evaluate(body => body.innerHTML, title);
    await title.dispose();
    expect(code).toBe('Settings');
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const body = await page.$('body');
    const bodyClass = await body.getProperty('className');
    const val = await bodyClass.jsonValue();
    expect(val).toBe('settings');
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    const url = new URL(page.url());
    expect(url.hash).toBe('#entry1');
  });

  it('Test11: Clicking the back button once should bring the user back to the home page', async() => {
  // define and implement test11: Clicking the back button once should bring the user back to the home page
    await page.goBack();
    const url = new URL(page.url());
    expect(url.pathname).toBe('/');
  });

  it('Test12: When the user if on the homepage, the header title should be “Journal Entries”', async() => {
  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
    const title = await page.$('header > h1');
    const code = await page.evaluate(body => body.innerHTML, title);
    await title.dispose();
    expect(code).toBe('Journal Entries');
  });

  it('Test13: On the home page the <body> element should not have any class attribute ', async() => {
  // define and implement test13: On the home page the <body> element should not have any class attribute 
    const body = await page.$('body');
    const bodyClass = await body.getProperty('className');
    const val = await bodyClass.jsonValue();
    expect(val).toBe('');
  });

  it('Test14: Verify the url is correct when clicking on the second entry', async() => {
  // define and implement test14: Verify the url is correct when clicking on the second entry
    const entries = await page.$$('journal-entry');
    const second = entries[1];
    await second.click();
    await page.waitForNavigation();
    const url = new URL(page.url());
    expect(url.hash).toBe('#entry2');
  });

  it('Test15: Verify the title is current when clicking on the second entry', async() => {
  // define and implement test15: Verify the title is current when clicking on the second entry
    const title = await page.$('header > h1');
    const code = await page.evaluate(body => body.innerHTML, title);
    await title.dispose();
    expect(code).toBe('Entry 2');
  });

  it('Test16: Verify the entry page contents is correct when clicking on the second entry', async() => {
  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
    const contents = {
      date: "4/26/2021",
      title: "Run, Forrest! Run!",
      content: "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
      image: {
        src: "https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg",
        alt: "forrest running"
      },
      audio: null
    };

    const title = await page.$eval('entry-page', (element) => {
      return element.entry.title;
    });
    expect(title).toBe(contents.title);
    
    const date = await page.$eval('entry-page', (element) => {
      return element.entry.date;
    });
    expect(date).toBe(contents.date);

    const content = await page.$eval('entry-page', (element) => {
      return element.entry.content;
    });
    expect(content).toBe(contents.content);

    const source = await page.$eval('entry-page', (element) => {
      return element.entry.image.src;
    });
    expect(source).toBe(contents.image.src);

    const alt = await page.$eval('entry-page', (element) => {
      return element.entry.image.alt;
    });
    expect(alt).toBe(contents.image.alt);
  }, 10000);

  it('Test17: No audio content on entry page 1', async() => {
  // create your own test 17
    await page.goBack();
    const entries = await page.$$('journal-entry');
    const first = entries[0];
    await first.click();
    await page.waitForNavigation();
    const audio = await page.$('.entry-audio');
    expect(audio).toBe(null);
  }, 10000);
  
  it('Test18: Verify clicking header on main page returns to base url', async() => {
  // create your own test 18
    await page.click('header > h1');
    const url = page.url();
    expect(url).toBe('http://127.0.0.1:5500/');
  }, 10000);
  
  it('Test19: Verify settings page is accessible from an entry page', async() => {
    // create your own test 19
    const entries = await page.$$('journal-entry');
    const first = entries[0];
    await first.click();
    await page.click('header > img');
    const url = new URL(page.url());
    expect(url.hash).toBe('#settings');
  }, 10000);

  it('Test20: Verify settings page has different color', async() => {
    // create your own test 20
    await page.click('header > img');
    const color = await page.$eval('body', (element) => {
      return window.getComputedStyle(element).getPropertyValue('background-color');
    });
    expect(color).toBe('rgb(222, 220, 220)');
  }, 10000);
});
