import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Chip,
  Drawer,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import {
  Attachment,
  CloseOutlined,
  Download,
  PlayCircleOutline,
  Star,
} from "@mui/icons-material";
import { getMovieDetailById } from "../../api/movies";
import ReactPlayer from "react-player";

function MovieDetail(props) {
  const [movieDetail, setMovieDetail] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [playing, setPlaying] = React.useState(false);
  useEffect(() => {
    if (props.movieId) {
      setLoading(true);
      getMovieDetailById(props?.movieId).then((res) => {
        setLoading(false);
        setMovieDetail(res?.movie);
      });
    }
  }, [props?.movieId]);
  return (
    <>
      <Drawer
        anchor={window.innerWidth < 700 ? "bottom" : "right"}
        open={props?.open}
      >
        {loading ? (
          <LinearProgress />
        ) : (
          <Box minWidth={{ sm: 500, xs: "100%" }} maxWidth={"sm"}>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              px={1}
              my={1}
            >
              <Typography fontWeight={700}>{movieDetail?.title}</Typography>
              <IconButton
                onClick={() => {
                  setPlaying(false);
                  props?.handleClose();
                }}
              >
                <CloseOutlined />
              </IconButton>
            </Box>
            {playing ? (
              <Box>
                <ReactPlayer
                  width={"100%"}
                  onEnded={() => {
                    setPlaying(false);
                  }}
                  playing={true}
                  url={`https://www.youtube.com/watch?v=${movieDetail?.yt_trailer_code}`}
                />
              </Box>
            ) : (
              <Box
                className={"movie-cover"}
                sx={{
                  background: `url(${movieDetail?.background_image})`,
                }}
              >
                {movieDetail?.yt_trailer_code ? (
                  <Box
                    position={"absolute"}
                    top={"30%"}
                    display={"flex"}
                    justifyContent={"center"}
                    width={"100%"}
                  >
                    <IconButton
                      onClick={() => {
                        setPlaying(true);
                      }}
                      size={"large"}
                    >
                      <PlayCircleOutline
                        sx={{ color: "#fff", width: 60, height: 60 }}
                      />
                    </IconButton>
                  </Box>
                ) : (
                  ""
                )}
                <Box className={"movie-cover-detail"}>
                  <Typography
                    sx={{ color: "#fff" }}
                    fontSize={25}
                    fontWeight={700}
                  >
                    {movieDetail?.title}, {movieDetail?.year}
                  </Typography>
                  <Box
                    display={"flex"}
                    gap={2}
                    flexWrap={"wrap"}
                    alignItems={"center"}
                  >
                    {movieDetail?.genres?.map((item) => (
                      <Chip
                        key={item}
                        className={"movie-genre-chip"}
                        variant={"outlined"}
                        label={item}
                      />
                    ))}
                  </Box>
                </Box>
                <Box className="movie-detail-rating">
                  <Star sx={{ color: "orange" }} />
                  <span>{movieDetail?.rating} / 10</span>
                </Box>
              </Box>
            )}
            <Box maxWidth={"sm"} p={2}>
              <Typography color={"gray"} fontWeight={"bold"}>
                {" "}
                {movieDetail?.runtime} min
              </Typography>
              {movieDetail?.description_intro}
            </Box>
            <Box maxWidth={"sm"} p={2} display={"grid"} gap={2}>
              <Typography variant={"h5"}>Links</Typography>
              <Box display={"flex"} flexWrap={"wrap"} gap={2}>
                {movieDetail?.torrents?.map((item, i) => (
                  <Card
                    key={i}
                    sx={{
                      px: 3,
                      py: 3,
                      display: "flex",
                      position: "relative",
                      gap: 2,
                      borderRadius: 2,
                      boxShadow: "none",
                      border: "1px solid orange",
                    }}
                  >
                    {/*  magnet:?xt=urn:btih:{info_hash}*/}
                    <Box
                      mt={4}
                      mb={2}
                      display={"flex"}
                      flexDirection={"column"}
                      gap={2}
                    >
                      <Button
                        size={"small"}
                        color={"primary"}
                        startIcon={<Download />}
                        href={item?.url}
                        target={"_blank"}
                      >
                        Link {i + 1}
                      </Button>
                      <Button
                        variant={"outlined"}
                        size={"small"}
                        startIcon={<Attachment />}
                        href={`magnet:?xt=urn:btih:${item?.hash}l`}
                        target={"_blank"}
                      >
                        Magnet link
                      </Button>
                    </Box>
                    <Box
                      position={"absolute"}
                      top={10}
                      left={10}
                      display={"grid"}
                      gap={0.5}
                    >
                      <Typography
                        fontSize={12}
                        color={"darkgray"}
                        fontWeight={"bold"}
                      >
                        Seeds: {item?.seeds}
                      </Typography>
                      <Typography
                        fontSize={12}
                        color={"darkgray"}
                        fontWeight={"bold"}
                      >
                        Peers: {item?.peers}
                      </Typography>
                    </Box>
                    <Box
                      color={"orange"}
                      position={"absolute"}
                      top={10}
                      right={10}
                      fontSize={12}
                    >
                      {item?.quality}
                    </Box>{" "}
                    <Box
                      color={"green"}
                      position={"absolute"}
                      bottom={10}
                      right={10}
                      fontSize={12}
                    >
                      {item?.size}
                    </Box>
                  </Card>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Drawer>
    </>
  );
}

export default MovieDetail;
