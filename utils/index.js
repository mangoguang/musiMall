

function base64_decode (input) { // 解码，配合decodeURIComponent使用
  var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var output = "";
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0;
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  while (i < input.length) {
      enc1 = base64EncodeChars.indexOf(input.charAt(i++));
      enc2 = base64EncodeChars.indexOf(input.charAt(i++));
      enc3 = base64EncodeChars.indexOf(input.charAt(i++));
      enc4 = base64EncodeChars.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
          output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
          output = output + String.fromCharCode(chr3);
      }
  }
  return utf8_decode(output);
}

export { base64_decode }


 //转码的时候特殊字符除掉
 function htmlDecode(text) {
    let str = text.replace(/\--/g,"+")
    return base64_decode(str)
  }

  export {htmlDecode}

function utf8_decode(utftext) { // utf-8解码
  var string = '';
  let i = 0;
  let c = 0;
  let c1 = 0;
  let c2 = 0;
  while (i < utftext.length) {
    c = utftext.charCodeAt(i);
    if (c < 128) {
      string += String.fromCharCode(c);
      i++;
    } else if ((c > 191) && (c < 224)) {
      c1 = utftext.charCodeAt(i + 1);
      string += String.fromCharCode(((c & 31) << 6) | (c1 & 63));
      i += 2;
    } else {
      c1 = utftext.charCodeAt(i + 1);
      c2 = utftext.charCodeAt(i + 2);
      string += String.fromCharCode(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63));
      i += 3;
    }
  }
  return string;
}


function format(time) {
  var timeArr = time.split(" ")
  var dayArr = timeArr[0].split("-")
  return dayArr[0] + '年' + dayArr[1] + '月' + dayArr[2] + '日' + timeArr[1]
   // var time = new Date(startTime*1000);
  // var mouth = time.getMonth() + 1;
  // var day = time.getDate();
  // var hour = time.getHours();
  // var minute = time.getMinutes();
  // var second = time.getSeconds()
  // mouth = mouth < 10 ? '0' + mouth : mouth
  // day = day < 10 ? '0' + day : day
  // hour = hour < 10 ? '0' + hour : hour
  // minute = minute < 10 ? '0' + minute : minute
  // second = second < 10 ? '0' + second : second

  // return mouth + '月' + day + '日' + hour + ':' + minute + ":" + second
}

export {format}



