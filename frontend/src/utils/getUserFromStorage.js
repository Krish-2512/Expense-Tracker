

const getUserFromStorage = () => {
  const tokenFromStorage= JSON.parse(localStorage.getItem('userInfo'))||null
  return(
    tokenFromStorage?.token
  )
}

export default getUserFromStorage

