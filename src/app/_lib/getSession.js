export async function getSession() {
  const res = await fetch("/api/auth/session")
  if (!res.ok) { throw new Error("fail to fetch session") }
  return res.json()
}