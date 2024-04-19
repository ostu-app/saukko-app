const environment = (() => {
  const host = window.location.host.toLocaleLowerCase().split(':')[0];

  if (host === 'localhost' || host === '172.0.0.1') {
    return 'development';
  }

  if (host.includes('saukko-dev-app')) {
    return 'staging'
  }

  return 'production'
})();


const environments = {
  development: {
    showTestEnvironmentWarning: false,
    appInsightsInstrumentationKey: undefined,
    environentName: 'DEVELOPMENT'
  },
  staging: {
    showTestEnvironmentWarning: true,
    appInsightsInstrumentationKey: 'bd7deb24-7b39-4832-bc15-2e18b6697064', // TODO: use ENV
    environentName: 'STAGING'
  },
  production: {
    showTestEnvironmentWarning: false,
    appInsightsInstrumentationKey: undefined,
    environentName: 'PRODUCTION'
  }
}

export default {
  environment,
  ...environments[environment],
}
