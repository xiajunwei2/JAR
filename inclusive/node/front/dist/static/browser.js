function getBrowserInfo() {
  var agent = navigator.userAgent.toLowerCase();
  // var regStr_ie = /msie [\d.]+;/gi;
  var regStr_ff = /firefox\/[\d.]+/gi
  var regStr_chrome = /chrome\/[\d.]+/gi;
  var regStr_saf = /safari\/[\d.]+/gi;
  var isIE = agent.indexOf("compatible") > -1 && agent.indexOf("msie" > -1); //判断是否IE<11浏览器  
  var isEdge = agent.indexOf("edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
  var isIE11 = agent.indexOf('trident') > -1 && agent.indexOf("rv:11.0") > -1;
  if (isIE) {
      var reIE = new RegExp("msie (\\d+\\.\\d+);");
      reIE.test(agent);
      var fIEVersion = parseFloat(RegExp["$1"]);
      if (fIEVersion == 7) {
          return "IE/7";
      } else if (fIEVersion == 8) {
          return "IE/8";
      } else if (fIEVersion == 9) {
          return "IE/9";
      } else if (fIEVersion == 10) {
          return "IE/10";
      } 
  } //isIE end 
  if (isIE11) {
      return "IE/11";
  }
  if (isEdge) {
      return "Edge";
  }
  //firefox
  if (agent.indexOf("firefox") > 0) {
      return agent.match(regStr_ff);
  }
  //Safari
  if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
      return agent.match(regStr_saf);
  }
  //Chrome
  if (agent.indexOf("chrome") > 0) {
      return agent.match(regStr_chrome);
  }
}
var browser = getBrowserInfo();//取到完整信息	
var b_name = (browser + "").replace(/[0-9./]/ig, "");//根据正则将所有数字、‘.’‘/’全部去掉，剩下浏览器名	
var b_version = parseInt((browser + "").replace(/[^0-9.]/ig, ""));//根据正则将所有非数字全部去掉，剩下版本
if(b_name=='IE' && b_version<=8){
  alert('该浏览器版本过低，请使用其他浏览器访问！推荐使用谷歌浏览器！')
}