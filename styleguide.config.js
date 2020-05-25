module.exports = {
    components: "src/Components/**/*.tsx",
    propsParser: require("react-docgen-typescript").withDefaultConfig({
      savePropValueAsString: true,
    }).parse
  };