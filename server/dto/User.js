class UserDto {
  id
  firstName
  lastName
  email
  isActivated
  picturePath
  friends
  location
  occupation
  viewedProfile
  impressions


  constructor(model) {
    this.id = model._id
    this.firstName = model.firstName
    this.lastName = model.lastName
    this.email = model.email
    this.isActivated = model.isActivated
    this.picturePath = model.picturePath
    this.friends = model.friends
    this.location = model.location
    this.occupation = model.occupation
    this.viewedProfile = model.viewedProfile
    this.impressions = model.impressions
  }
}

export default UserDto