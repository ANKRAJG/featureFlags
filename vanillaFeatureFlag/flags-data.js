export const featureFlags = {
  darkMode: true,
  youTube: true,
  google: true,
  netflix: true,
};

export const getSubscriptionFeatures = (newFlags) => {
  const subscriptionFeatures = {};
  const flags = newFlags ? newFlags : featureFlags;
  for (let key in flags) {
    if (flags.hasOwnProperty(key)) {
      subscriptionFeatures[key] = {
        label: key === "darkMode" ? "Dark Mode" : `${key} subscription`,
      };
    }
  }
  return subscriptionFeatures;
};
