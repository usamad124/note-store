import React, {useState} from "react";

//SVG stands for scalable vector graphics


const HeartComment =()=>{
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

const handleLike = ()=>{
    if(!isLiked){
        setLikeCount(likeCount+1);
    }
        else{
            setLikeCount(likeCount -1);
        }
    setIsLiked(!isLiked);
}

return(
<div>
    <p> {likeCount} likes</p>
    <svg
    className={`heart-icon ${isLiked ? 'liked': ''}`}
    onClick={handleLike}
    >
        <path
        d="M12 21.35l-1.45-1.32C5.4 15.33 2 12.08 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.58-3.4 6.83-8.55 11.53L12 21.35z"
      />
    </svg>
</div>

)
}
export default HeartComment;
