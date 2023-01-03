import systemStore from '@/store/systemStore'
import Request from './Request'

const http = new Request({
  timeout: +systemStore().env.VITE_REQUEST_TIMEOUT
})

export default http
