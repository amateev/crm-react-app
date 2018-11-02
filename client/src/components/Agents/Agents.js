export const _loadAgent = () => {
  return fetch ("http://localhost:3001/agent").then(res => res.json())
}