const Tables = require('../page_objects/testing.po');

describe('Testing Table', () => {
  const tables = new Tables();

  beforeAll(() => {
    browser.url(tables.url);
  });

  it('should return the following data from the last name column', () => {
    const lastNames = tables.getLastNameColumn();
    const lastNameValues = lastNames.map(index => index.label);
    const expectedLastNames = ['Smith', 'Bach', 'Doe', 'Conway'];
    expect(lastNameValues).toEqual(expectedLastNames);
  });

  it('should return the following data from the first name column', () => {
    const firstNames = tables.getFirstNameColumn();
    const firstNameValues = firstNames.map(index => index.label);
    const expectedFirstNames = ['John', 'Frank', 'Jason', 'Tim'];
    expect(firstNameValues).toEqual(expectedFirstNames);
  });

  it('should return the following data from the email name column', () => {
    const emails = tables.getEmailColumn();
    const emailValues = emails.map(index => index.label);
    const expectedEmails = ['jsmith@gmail.com', 'fbach@yahoo.com', 'jdoe@hotmail.com', 'tconway@earthlink.net'];
    expect(emailValues).toEqual(expectedEmails);
  });

  it('should return the following data from the due name column', () => {
    const dues = tables.getDueColumn();
    const dueValues = dues.map(index => index.label);
    const expectedDues = ['$50.00', '$51.00', '$100.00', '$50.00'];
    expect(dueValues).toEqual(expectedDues);
  });

  it('should return the following data from the web site name column', () => {
    const websites = tables.getWebSiteColumn();
    const websiteValues = websites.map(index => index.label);
    const expectedWebsites = ['http://www.jsmith.com', 'http://www.frank.com', 'http://www.jdoe.com', 'http://www.timconway.com'];
    expect(websiteValues).toEqual(expectedWebsites);
  });
});
