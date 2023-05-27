import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Box,
  Divider,
  Typography,
  InputBase,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import { DeleteOutline, EditOutlined, GifBoxOutlined, MicOutlined, MoreHorizOutlined, ImageOutlined } from "@mui/icons-material"
import Dropzone from "react-dropzone"

import UserImage from "../../components/UserImage"
import WidgetWrapper from "../../components/WidgetWrapper" 
import { setPosts } from "../../state"

const CreatePostWidget = ({ picturePath }) => {
  const dispatch = useDispatch()
  const [isImage, setIsImage] = useState(false)
  const [image, setImage] = useState(false)
  const [post, setPost] = useState("")
  const { palette } = useTheme()
  const { id } = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const isNonMobileScreens = useMediaQuery("(min-width: 768px)")
  const { mediumMain, medium, light } = palette.neutral

  const handlePost = async () => {
    const formData = new FormData()
    formData.append("userId", id)
    formData.append("description", post)
    if (image) {
      formData.append("picture", image)
      formData.append("picturePath", image.name)
    }

    const response = await fetch("http://localhost/posts",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    const posts = await response.json()
    dispatch(setPosts({ posts }))
    setImage(null)
    setPost("")
  }

  return (
    <WidgetWrapper>
      <Box className="flex-between gap-6">
        <Box>
          <UserImage size="56px" image={picturePath} />
        </Box>
        <InputBase 
          placeholder="Что у вас нового?"
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: light,
            borderRadius: "2rem",
            padding: "0.75rem 2rem",
          }}
        />
      </Box>
      {isImage && 
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) =>
              setImage(acceptedFiles[0])
            }
          >
            {({ getRootProps, getInputProps }) => (
              <Box className="flex-between">
                <Box
                  {...getRootProps()}
                  className="p-4 w-full hover:cursor-pointer"
                  border={`2px dashed ${palette.primary.main}`}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <Typography color={palette.neutral.main}>
                      Добавить изображение
                    </Typography>
                  )
                  : (
                    <Box className="flex-between">
                      <Typography>{values.picture.name}</Typography>
                      <EditOutlined />
                    </Box>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    width="15%"
                  >
                    <DeleteOutline />
                  </IconButton>
                )}
              </Box>
            )}
          </Dropzone>
        </Box>
      }

      <Divider sx={{ margin: "1.25rem 0" }} />

      <Box className="flex-between">
        <Box className="flex-between" gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <IconButton
            sx={{
              borderRadius: "16px"
            }}
          >
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={medium} 
              sx={{ "&:hover": { cursor: "pointer"} }}
            >
              Изображение
            </Typography>
          </IconButton>
        </Box>

        {isNonMobileScreens && (
          <>
            <Box className="flex-between" gap="0.25rem">
              <IconButton
                sx={{
                  borderRadius: "16px"
                }}
              >
                <GifBoxOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Видео</Typography>
              </IconButton>
            </Box>

            <Box className="flex-between" gap="0.25rem">
              <IconButton>
                <MoreHorizOutlined sx={{ color: mediumMain }} />  
              </IconButton>
            </Box>
          </>
        )}

        <Button
          onClick={handlePost}
          sx={{
            textTransform: "capitalize",
            fontSize: "16px",
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "2rem",
            padding: "0.5rem 1rem",
            "&:hover": {
              color: palette.primary.main,
            }
          }}
        >
          Опубликовать
        </Button>
      </Box>

    </WidgetWrapper>
  )
}

export default CreatePostWidget