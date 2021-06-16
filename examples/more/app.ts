import axios from '../../src/index'

import qs from 'qs'

import NProgress from 'nprogress'

import { AxiosError } from '../../src/types'

document.cookie = 'a=b'

axios.get('/more/get').then(res => {
  console.log(res)
})

axios
  .post(
    'http://localhost:8088/more/server2',
    {},
    {
      withCredentials: true
    }
  )
  .then(res => {
    console.log(res)
  })

const instance1 = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D'
})

instance1.get('/more/get').then(res => {
  console.log(res)
})

const instance2 = axios.create()

function calculatePercentage(loaded: number, total: number): number {
  return Math.floor(loaded * 1.0) / total
}

function loadProgressBar(): void {
  const setupStartProgress = () => {
    instance2.interceptors.request.use(config => {
      NProgress.start()
      return config
    })
  }

  const setupUpdateProgress = () => {
    const update = (e: ProgressEvent) => {
      console.log(e)
      NProgress.set(calculatePercentage(e.loaded, e.total))
    }
    instance2.defaults.onDownloadProgress = update
    instance2.defaults.onUploadProgress = update
  }

  const setupStopProgress = () => {
    instance2.interceptors.response.use(
      response => {
        NProgress.done()
        return response
      },
      error => {
        NProgress.done()
        return Promise.reject(error)
      }
    )
  }

  setupStartProgress()
  setupUpdateProgress()
  setupStopProgress()
}

loadProgressBar()

const downloadEl = document.getElementById('download')
downloadEl.addEventListener('click', e => {
  instance2.get(
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180918%2F7bdb68794eae4603990508659549467b.jpg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg'
  )
})

const uploadEl = document.getElementById('upload')
uploadEl.addEventListener('click', e => {
  const data = new FormData()
  const fileEl = document.getElementById('file') as HTMLInputElement
  if (fileEl.files) {
    data.append('file', fileEl.files[0])

    instance2.post('/more/upload', data)
  }
})

axios
  .post(
    '/more/auth',
    {
      a: 1
    },
    {
      auth: {
        username: 'Wang',
        password: '123456'
      }
    }
  )
  .then(res => {
    console.log('/more/auth - res', res)
  })

axios
  .get('/more/304')
  .then(res => {
    console.log(res)
  })
  .catch((e: AxiosError) => {
    console.log(e.message)
  })

axios
  .get('/more/304', {
    validateStatus(status) {
      return status >= 200 && status < 400
    }
  })
  .then(res => {
    console.log(res)
  })
  .catch((e: AxiosError) => {
    console.log(e.message)
  })

axios
  .get('/more/get', {
    params: new URLSearchParams('a=b&c=d')
  })
  .then(res => {
    console.log(res)
  })

axios
  .get('/more/get', {
    params: {
      a: 1,
      b: 2,
      c: ['a', 'b', 'c']
    }
  })
  .then(res => {
    console.log(res)
  })

const instance3 = axios.create({
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'brackets' })
  }
})

instance3
  .get('/more/get', {
    params: {
      a: 1,
      b: 2,
      c: ['a', 'b', 'c']
    }
  })
  .then(res => {
    console.log(res)
  })

const instance4 = axios.create({
  baseURL: 'https://img.zcool.cn/community/'
})

instance4.get('017e1d5cafd9caa801208f8bd6e372.jpg')

instance4.get('https://img.zcool.cn/community/017e1d5cafd9caa801208f8bd6e372.jpg')

function getA() {
  return axios.get('/more/A')
}

function getB() {
  return axios.get('/more/B')
}

axios.all([getA(), getB()]).then(
  axios.spread(function(resA, resB) {
    console.log(resA.data)
    console.log(resB.data)
  })
)

axios.all([getA(), getB()]).then(([resA, resB]) => {
  console.log(resA.data)
  console.log(resB.data)
})

const fakeConfig = {
  baseURL: 'https://www.baidu.com/',
  url: '/user/12345',
  params: {
    idClient: 1,
    idTest: 2,
    testString: 'thisIsATest'
  }
}
console.log(axios.getUri(fakeConfig))
