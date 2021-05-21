export default function apiCall(url) {
  return fetch(url)
    .then((res) => res.json())
    .then(
      (result) => {
        return result
      },
      (e) => {
        console.log(e)
      }
    )
}
