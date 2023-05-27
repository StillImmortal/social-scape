import PostDto from "../dto/Post.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

const formattedPosts = (post => new PostDto(post))

// CREATE
export const createPost = async (req, res, next) => {
  try {
    const { userId, description, picturePath } = req.body
    const user = await User.findById(userId)
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: []
    })
    await newPost.save()

    const posts = await Post.find()
    const postsData = posts.map(formattedPosts)
    res.status(201).json(postsData)
  } catch (error) {
    next(error)
  }
}

// READ
export const getFeedPosts = async (req, res, next) => {
  try {
    const post = await Post.find()
    const postData = new PostDto(post)
    res.status(201).json(postData)
  } catch (error) {
    next(error)
  }
}

export const getUserPosts = async (req, res, next) => {
  try {
    const { userId } = req.params
    const posts = await Post.find({ userId })
    const postsData = posts.map(formattedPosts)
    res.status(201).json(postsData)
  } catch (error) {
    next(error)
  }
}

// UPDATE
export const likePost = async (req, res, next) => {
  try {
    const { id } = req.params
    const { userId } = req.body
    const post = await Post.findById(id)
    const isLiked = post.likes.get(userId)
    if (isLiked) {
      post.likes.delete(userId)
    } else {
      post.likes.set(userId, true)
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    )
    const updatedPostData = new PostDto(updatedPost)
    res.status(201).json(updatedPostData)
  } catch (error) {
    next(error)
  }
}