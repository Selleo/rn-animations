module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          alias: {
            "@assets": "./assets",
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@participants": "./participants",
            "@src": "./src",
            "@styles": "./src/styles",
          },
        },
      ],
    ],
  };
};
