//fetch 

export default async function fetch(resource, option) {
  const headers = {
    "Content-Type": "application/json",
  }
  let token = ""
  try {
    token = localStorage.getItem("token")
  } catch (e) {
    token = ""
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const options = {
    ...option,
    headers,
  }

  return await fetch(resource, options)

}