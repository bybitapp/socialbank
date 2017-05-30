var config = {
    general: {
      port: process.env.PORT || 3001,
      ensureHttps: process.env.ENSURE_HTTPS || false,
      name: process.env.APP_NAME || "socialbank",
      url: process.env.APP_URL || "http://www.socialbank.co",
    },
    opc: {
      urlApi: 'https://app-gateway.openpayments.cloud/api',
      programmeKey: 'team-01|957296499696862',
      programmeId: '957296499696862',
      username: 'team-01',
      password: '8Lx3WSn^',
      ownerId: '87593085012710413',
      currency: 'GBP',
      country: 'GB',
      issueProvider: 'Card Issuing Provider',
      profile: {
        corporateIdentity: '97593089101268736',
        managedCard: '97593089101269248',
        managedAccount: '97593089101268992',
        externalAccount: '97593089101269504',
        withdraw: '97593089101271040',
        deposit: '97593089101270016',
        transfer: '97593089101269760'
      }
    },
    google: {
      mapKey: 'AIzaSyCkwfHICB6QowBNjiGBZc12MH2HbdZnHbM'
    }
};

module.exports = config;
