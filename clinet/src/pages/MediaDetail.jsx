import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import {LoadingButton} from '@mui/lab'
import {Box, Button, Chip, Divider, Stack, Typography} from "@mui/material"
import { useEffect, useState, useRef } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CircularRate from "../components/common/CircularRate"
import Container from "../components/common/Container"
import ImageHeader from "../components/common/ImageHeader";
import uiConfigs from "../configs/ui.configs";
import tmdbConfings from "../api/configs/tmdb.configs"
import mediaApi from "../api/modules/media.api"
import favouriteApi from "../api/modules/favourite.api"
import { setGlobalLoading} from "../redux/featuers/globalLoadingSlice"
import {setAuthModalOpen} from "../redux/featuers/authModalSlice"
import { addFavourite, removeFavourite} from "../redux/featuers/userSlice"
import tmdbConfigs from "../api/configs/tmdb.configs";
import CastSlide from "../components/common/CastSlide";
import MediaVideoSlide from "../components/common/MediaVideoSlide";
import BackdropSlide from "../components/common/BackdropSlide";
import PosterSlide from "../components/common/PosterSlide";
import RecommendSlide from "../components/common/RecommendSlide";
import MediaSlide from "../components/common/MediaSlide";
import MediaReview from "../components/common/MediaReview";

const MediaDetail = () => {

  const {mediaType, mediaId} = useParams()
  const {user, listFavourites }= useSelector( (state) => state.user)
  const [media, setMedia] = useState()
  const [isFavourite, setIsFavourite] = useState(false);
  const [onRequest, setOnRequest] = useState(false);
  const [genres, setGenres] = useState([]);

  const dispatch = useDispatch()
  const videoRef = useRef()

  useEffect(() =>{
    window.scrollTo(0, 0);
    const getMedia = async() =>{
      dispatch(setGlobalLoading(true))
      const {response, err} = await mediaApi.getDetail({ mediaType, mediaId})
      dispatch(setGlobalLoading(false))

      if(response){
        setMedia(response)
        setIsFavourite(response.isFavourite)
        setGenres(response.genres.splice(0, 2))
      }
      if(err) toast.error(err.message)
    };

    getMedia()
  },[mediaType, mediaId, dispatch])

  const onFavoriteClick = async()=>{
    if(!user) return dispatch(setAuthModalOpen(true));

    if(onRequest) return 

    if(isFavourite){
      onRemoveFavourite();
      return
    }
    setOnRequest(true)

    const body = {
      mediaId: media.id,
      mediaTitle: media.title || media.name,
      mediaType: mediaType,
      mediaPoster: media.poster_path,
      mediaRate: media.vote_average
    }

    const {response, err} = await favouriteApi.add(body)
    setOnRequest(false)

    if(err) toast.error(err.message)
    if(response) {
      dispatch(addFavourite(response))
      setIsFavourite(true)
      toast.success("Add favourite")
    }
  }

  const onRemoveFavourite = async () =>{
    if(onRequest) return 
    setOnRequest(true)

    const favourite = listFavourites.find( e=> e.mediaId.toString() === media.id.toString())

    const {response, err} = await favouriteApi.remove({ favouriteId: favourite.id})

    setOnRequest(false);

    if(err) toast.error(err.message)
    if(response) {
      dispatch(removeFavourite(favourite))
      setIsFavourite(false)
      toast.success("Remove favourite");
    }
  }
  return (
    media? (
      <>
        <ImageHeader imgPath={tmdbConfings.backdropPath(media.backdrop_path || media.poster_path)} />
        <Box
          sx={{
              color: "primary.contrastText",
              ...uiConfigs.style.mainContent
          }}
        >
           <Box sx={{
            marginTop: {xs: "-10rem", md: "-15rem", lg: "-20rem"}
           }}>
              <Box sx={{
                display:"flex",
                flexDirection: {md: "row", xs: "column"}
              }}>
                  {/* poster */}
                  <Box sx={{
                     width: { xs: "70%", sm: "50%", md: "30%" },
                     margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" }
                  }}>
                      <Box sx={{
                        paddingTop: "140%",
                        ...uiConfigs.style.backgroundImage(tmdbConfigs.posterPath(media.poster_path || media.backdrop_path))
                      }} />
                  </Box>

                  {/* media_info */}
                  <Box sx={{
                     width: { xs: "100%", md: "60%" },
                     color: "text.primary"
                  }}>
                      <Stack spacing={5}>
                        <Typography
                          variant="h5"
                          fontSize={{ xs: "1rem", md: "1rem", lg: "2rem" }}
                          fontWeight="700"
                          sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                        >
                            {`${media.title || media.name} ${mediaType === tmdbConfigs.mediaType.movie ?
                               media.release_date.split("-")[0] : media.first_air_date.split("-")[0]}`}
                        </Typography>
                      </Stack>

                      <Stack direction="row" spacing={1} alignItems="center">
                            <CircularRate value={media.vote_average} />

                            <Divider orientation="vertical" />

                            {genres.map((genre, index) =>(
                              <Chip 
                                label={genre.name}
                                variant="filled"
                                color="primary"
                                key={index}
                              />
                            ))}
                      </Stack>

                      <Typography
                        variant="body1"
                        sx={{ ...uiConfigs.style.typoLines(5) }}
                      >
                        {media.overview}
                      </Typography>

                      <Stack direction="row" spacing={1} sx={{paddingTop:5}}>
                          <LoadingButton
                              variant="text"
                              sx={{
                                width: "max-content",
                                "& .MuiButon-starIcon": { marginRight: "0" }
                              }}
                              size="large"
                              startIcon={isFavourite ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
                              loadingPosition="start"
                              loading={onRequest}
                              onClick={onFavoriteClick}
                          />
                          <Button
                             variant="outlined"
                             sx={{ width: "max-content" }}
                             size="large"
                             startIcon={<PlayArrowIcon />}
                             onClick={() => videoRef.current.scrollIntoView()}
                          >
                            play
                          </Button>
                      </Stack>

                      <Container header="Cast">
                        <CastSlide casts={media.credits.cast} />
                      </Container>
                  </Box>
              </Box>
           </Box>

           {/* media_video */}
            <div ref={videoRef} style={{ paddingTop: "2rem"}}>
              <Container header="Videos">
                <MediaVideoSlide videos={media.videos.results.splice(0, 5)} />
              </Container>
            </div>


            {/* media_backdrop_slide */}
            {media.images.backdrops.length > 0 && (
              <Container header="backdrops">
                  <BackdropSlide backdrops={media.images.backdrops} />
              </Container>
            )}

            {/* {media_poster} */}
            {media.images.posters.length > 0 && (
              <Container header="posters">
                <PosterSlide posters={media.images.posters} />
              </Container>
            )}

            {/* media_review */}
            <MediaReview reviews={media.reviews} media={media} mediaType={mediaType} />

            {/* media_recommendation */}
            <Container header="you may also like">
               {media.recommend.length > 0 && (
                <RecommendSlide medias={media.recommend} mediaType={mediaType} />
               )}
               {
                media.recommend.length === 0 &&(
                  <MediaSlide
                    mediaType={mediaType}
                    mediaCategory={tmdbConfigs.mediaCategory.top_rated}
                  />
                )
               }
            </Container>
        </Box>
      </>
    ): null
  )
}

export default MediaDetail