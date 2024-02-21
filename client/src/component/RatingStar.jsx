// import React from 'react'
// import { FaStar, FaStarHalfAlt } from "react-icons/fa";

// const RatingStar = (props) => {
//     // const star = parseFloat(props.rating);

//     if(star = 1){
//         return <div>1</div>

//     }else if(star > 1 && star < 2){
//         return <div>1.5</div>

//     }else if(star == 2){
//         return <div>2</div>

//     }else if(star > 2 && star < 3){
//         return <div>2.5</div>

//     }else if(star == 3){
//         return <div>3</div>

//     }else if(star > 3 && star < 4){
//         return <div>3.5</div>
//     }else if(star == 4){
//         return <div>4</div>

//     }else if(star > 4 && star < 5){
//         return <div>4.5</div>
//     }else{
//         return <div>5</div>
//     }

// }

// export default RatingStar




import React from 'react'

const RatingStar = ({rating}) => {

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          if (i <= rating) {
            stars.push(<span key={i}>&#9733;</span>); // Render filled star
          } else {
            stars.push(<span key={i}>&#9734;</span>); // Render empty star
          }
        }
        return stars;
      };

      
  return (
    <div>
      {renderStars()}
      <span>{rating}</span>
    </div>
  )
}

export default RatingStar
