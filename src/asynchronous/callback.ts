export default function callbackSample() {
  const url = 'https://api.github.com/users/keisuke-333'

  // コールバックで呼び出す非同期処理
  const fetchProfile = () => {
    return fetch(url)
      .then((res) => {
        res
          .json()
          .then((json) => {
            console.log(json)
            return json
          })
          .catch((error) => {
            console.error(error)
          })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const profile = fetchProfile()
  console.log(profile)
}
