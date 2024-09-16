export const hostname = () => {
  const host = window.location.hostname
  if (host === process.env.NEXT_PUBLIC_ADMIN_ROUTE) return "admin"
  if (host === "localhost") return "admin"
  if (host === process.env.NEXT_PUBLIC_USER_ROUTE) return "user"
  return "error"
}
