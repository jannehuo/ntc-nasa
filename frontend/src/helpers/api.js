export default function apiCall(url) {
  return fetch(url).then((res) => {
    if (res.status === 200) {
      return res.json()
    }
    return res
  })
}
