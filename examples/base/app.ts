import axios from '../../src/index'

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

const date = new Date()
axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
})

axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
})

axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
})

axios({
  method: 'post',
  url: '/base/post1',
  data: {
    a: 1,
    b: 2
  }
})

const arr = new Int32Array([21, 31])
axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
})

axios({
  method: 'post',
  url: '/base/post2',
  headers: {
    'content-type': 'application/json'
  },
  data: {
    a: 1,
    b: 2
  }
})

const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)
axios({
  method: 'post',
  url: '/base/post3',
  data: searchParams
})

axios({
  method: 'post',
  url: '/base/post4',
  data: {
    a: 3,
    b: 4
  }
}).then(res => {
  console.log('/base/post4 - res', res)
})

axios({
  method: 'post',
  url: '/base/post5',
  responseType: 'json',
  data: {
    a: 3,
    b: 4
  }
}).then(res => {
  console.log('/base/post5 - res', res)
})
