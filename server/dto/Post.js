class PostDto {
  userId
  firstName
  lastName
  location
  description
  picturePath
  userPicturePath
  likes
  comments


  constructor(model) {
    this.userId = model.userId
    this.firstName = model.firstName
    this.lastName = model.lastName
    this.location = model.location
    this.description = model.description
    this.picturePath = model.picturePath
    this.userPicturePath = model.userPicturePath
    this.likes = model.likes
    this.comments = model.comments
  }
}

export default PostDto