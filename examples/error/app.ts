import axios, { AxiosError } from '../../src/index'

axios({
  method: 'get',
  url: '/error/get'
})
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log(e)
  })

setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  })
    .then(res => {
      console.log(res)
    })
    .catch(e => {
      console.log(e)
    })
}, 5000)

axios({
  method: 'get',
  url: '/error/timeout1',
  timeout: 2000
})
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log(e.message)
  })

axios({
  method: 'get',
  url: '/error/timeout2',
  timeout: 2000
})
  .then(res => {
    console.log(res)
  })
  .catch((e: AxiosError) => {
    console.log('/error/timeout2 - error', e)
    console.log('/error/timeout2 - error.message', e.message)
    console.log('/error/timeout2 - error.code', e.code)
  })
