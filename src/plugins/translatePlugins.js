import translate from '../utils/translate.js';

export default {
  install(app, options = {}) {
    // 默认配置
    const defaultOptions = {
      defaultLang: 'chinese_simplified',
      showLanguageTag: false,
      useVersion2: false // 3.x 默认就是 v2，可以不改
    };

    const config = { ...defaultOptions, ...options };

    // 初始化
    if (config.useVersion2 && translate.setUseVersion2) {
      translate.setUseVersion2();
    }
    translate.language.setLocal(config.defaultLang);
    translate.selectLanguageTag.show = config.showLanguageTag;
    translate.listener.start();

    // 挂到全局
    app.config.globalProperties.$translate = translate;
  }
};
