import User from "../models/User.js";
import UserDto from "../dto/User.js";

const formattedFriends = ({_id, firstName, lastName, occupation, location, picturePath}) => ({_id, firstName, lastName, occupation, location, picturePath})

// READ
export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    const userData = new UserDto(user)
    res.status(200).json(userData)
  } catch (error) {
    next(error)
  }
}

export const getUserFriends = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById(id) 
    const friends = await Promise.all(user.friends.map(id => User.findById(id)))
    const friendsData = friends.map(formattedFriends)
    res.status(200).json(friendsData)
  } catch (error) {
    next(error)
  }
}

// UPDATE
export const addRemoveFriend = async (req, res, next) => {
  try {
    const  { id, friendId } = req.params
    const user = await User.findById(id)
    const friend = await User.findById(friendId)

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter(id => id !== friendId)
      friend.friends = friend.friends.filter(friendId => friendId !== id)
    } else {
      user.friends.push(friendId)
      friend.friends.push(id)
    }

    await user.save()
    await friend.save()

    const friends = await Promise.all(
      user.friends.map(id => User.findById(id))
    )

    const friendsData = friends.map(formattedFriends)

    res.status(200).json(friendsData)
  } catch (error) {
    next(error)
  }
}