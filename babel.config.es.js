module.exports = (api) => {
    api.cache(true)
  
    return {
      presets: [
        ["@babel/env", {
            "modules": false
        }],
        "@babel/react"
      ],
      plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
      ]
    }
  };
  