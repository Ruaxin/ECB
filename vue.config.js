module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/ECB-website/'
    : '/',
  chainWebpack: config => {
    //发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      //entry找到默认的打包入口，调用clear则是删除默认的打包入口
      //add添加新的打包入口
      config.entry('app').clear().add('./src/main-prod.ts')
    })
    //开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dve.ts')
    })
  }
}
