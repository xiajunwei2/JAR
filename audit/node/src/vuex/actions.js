function findIndex(list, music) {
  return list.findIndex(item => {
    return item.id === music.id
  })
}
