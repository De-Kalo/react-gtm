import warn from './utils/warn'

// https://developers.google.com/tag-manager/quickstart

const Snippets = {
  tags: function ({ id, events, dataLayer, dataLayerName, preview, auth, gtmJsUrl, gtmNoScriptUrl }) {
    const gtm_auth = `&gtm_auth=${auth}`
    const gtm_preview = `&gtm_preview=${preview}`

    if (!id) warn('GTM Id is required')

    gtmJsUrl = gtmJsUrl || 'https://www.googletagmanager.com/gtm.js'
    gtmNoScriptUrl = gtmNoScriptUrl || (gtmJsUrl.replace(/\/[^\/]+\.js$/, '/ns.html')) || 'https://www.googletagmanager.com/ns.html'

    
    const iframe = `
    <iframe src="${gtmNoScriptUrl}?id=${id}${gtm_auth}${gtm_preview}&gtm_cookies_win=x"
        height="0" width="0" style="display:none;visibility:hidden" id="tag-manager"></iframe>`
  
    const script = `
      (function(w,d,s,l,i){w[l]=w[l]||[];
        w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js', ${JSON.stringify(events).slice(1, -1)}});
        var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
        j.async=true;j.src='${gtmJsUrl}?id='+i+dl+'${gtm_auth}${gtm_preview}&gtm_cookies_win=x';
        f.parentNode.insertBefore(j,f);
      })(window,document,'script','${dataLayerName}','${id}');`
  
    const dataLayerVar = this.dataLayer(dataLayer, dataLayerName)
  
    return {
      iframe,
      script,
      dataLayerVar
    }
  },
  dataLayer: function (dataLayer, dataLayerName) {
    return `
      window.${dataLayerName} = window.${dataLayerName} || [];
      window.${dataLayerName}.push(${JSON.stringify(dataLayer)})`
  }
}  

module.exports = Snippets
