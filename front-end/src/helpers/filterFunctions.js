//To get the owner names with owner id
 export  function getOwnerNames(users, owner_id) {
    const ownerUser = users && (users.find((user) => {
    return (user.id === owner_id) 
  })
  )
  return ownerUser ? ownerUser.first_name : 'not exist'
}

