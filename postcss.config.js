module.exports = {
  //  兼容css后缀 自动编译css兼容性
  plugins: [
      require('autoprefixer')({
          browsers: [
              '> 1%',
              'last 2 versions',
              'Android >= 4.0',
              'IOS >=4.0',
              'last 5 Firefox versions',
              'Firefox >=10',
              'Chrome >10',
              'Safari >= 6',
              'ie >=9'
          ]
      })
  ]
};