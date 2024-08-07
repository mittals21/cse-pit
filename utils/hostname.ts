export const hostname = () => {
  const host = window.location.hostname
  return host === process.env.NEXT_PUBLIC_ADMIN_ROUTE
    ? "admin"
    : process.env.NEXT_PUBLIC_USER_ROUTE
    ? "user"
    : "error"
}
