import qs from 'qs'
import axios from 'axios'

export function reqIp() {
  axios.post('/accessCount/record', qs.stringify({
    		reqIp: window.localStorage.getItem('ip'),
    		reqArea: window.localStorage.getItem('cname'),
    		reqUrl: document.location.href,
    		reqDevice: navigator.userAgent,
    		reqResolution: window.screen.width + '*' + window.screen.height
  		})).then(res => {
  })
}
