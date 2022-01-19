import React, { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Outer = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;

`
const LeftDiv = styled.div`
  text-align: left;
  #userid {
    font-weight: bold;
  }
`
const RightDiv = styled.div`
  display: block;
`
const DeleteBtn = styled.button`
  display: block;
  border: 1px solid black;
`
const LikeBtn = styled.button`
  display: block;
  margin-top: 0.3rem;
  border: 1px solid black;
`

let url = process.env.REACT_APP_LOCAL_URL;
if (!url) url = "https://thereweather.space/api";

// 아이디, 댓글내용, 날짜 / 좋아요하트, 삭제버튼
export default function Comment({content, commentDelete, userInfo}) {
  console.log("댓글 작성한 유저", content);
  const [click, setClick] = useState(false);
  const [likeCount, setLikeCount] = useState("");
  // const [readLike, setReadLike] = useState({ like_count: "" });
  console.log("현재 접속중인유저", userInfo);

  // 댓글 좋아요 클릭
  const commentLike = () => {
    axios({
      url: url + "/likecomment",
      method: "post",
      data: {
        user_id: userInfo.user_id,//현재 접속중인 유저 Id
        post_id: content.post_id,
        comment_id: content.id, //댓글 작성한 유저 Id
        like_count: 0
      },
      withCredentials: true,
    })
    .then((res) => {
      console.log(res.data) 
      console.log(res.data.length) 
      
      // const count = res.data
      // const totalCounts = count.map(el => el.like_count).reduce((pre, cur) => pre + cur, 0); 
      // setClick(!click)
      const totalCounts = res.data.length
      setLikeCount(totalCounts)

      if(click === false){
        setClick(true)
      }else{
        setClick(false)
      }
    })
  }

  useEffect(() => {    
    axios({
      url: url + "/readlike",
      method: "post",
      data:{
        user_id: userInfo.user_id,//현재 접속중인 유저 Id
        post_id: content.post_id,
        comment_id: content.id, //댓글 작성한 유저 Id
      },
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then((res) => {
      setClick(!click)
      console.log(res.data)
      const totalCounts = res.data.length
      setLikeCount(totalCounts)
    })
  }, [])

  // useEffect(() => {}, []);


  return (
    <Outer>
      <LeftDiv>
        <p id="userid">{content.comment_user_id}</p>
        <p>{content.comment_content}</p>
        <p>{content.createdAt}</p>
      </LeftDiv>

      <RightDiv>
        <DeleteBtn onClick={() => commentDelete(content.id)}>삭제</DeleteBtn>
        <LikeBtn 
          onClick={commentLike}
          // onClick={() => commentLike(content.id)}
        >
          {
            click? 
              <FontAwesomeIcon 
              icon={faHeart}
              className="heart"
              color="red"
              /> :
              <FontAwesomeIcon 
              icon={faHeart}
              className="heart"
              color="#aaa"
              />
          }
          <span>{likeCount}</span>
        </LikeBtn>
      </RightDiv>
    </Outer>
  )
}
