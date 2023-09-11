// import "./ParkCards.css";

// interface ParkCardProps {
//   park: {
//     total: string;
//     limit: string;
//     start: string;
//     data: [
//       {
//         id: string;
//         fullName: string;
//         images: Array<{
//           credit: string;
//           title: string;
//           altText: string;
//           caption: string;
//           url: string;
//         }>;
//       }
//     ];
//   };
// }

// function ParkCard(props: ParkCardProps) {
//   const { park } = props;
//   return (
//     // router: make div => link and to= path to park details
//     <div className="park-card">
//       {/* <img className="park-card-img" src={park.data.images[0].url} />
//       <h3 className="park-card-name">{park.fullName}</h3>
//       <button className="park-card-favorite">img here</button> */}
//     </div>
//   );
// }

// export default ParkCard;

import React from "react";
import "./ParkCards.css";
import errorImage from "../images/logo.svg";

interface ParkProps {
  id: string;
  fullName: string;
  description: string;
  url: string;
  activities: Array<{ id: string; name: string }>;
  images: Array<{ url: string; altText: string }>;
}
function ParkCards(props: ParkProps) {
  console.log('parkprops:', props)
  return (
    <div className="park-card">
      <img
        className="park-img"
        src={props.parks.images[0].url}
        alt={props.images[0].altText}
        id={props.id}
      ></img>
      <h3 className="park-title">{props.fullName}</h3>
    </div>
  );
}
// function ParkCards({ park }: { park: ParkProps }) {
//   // if (!park || !park.activities || !park.images) {
//   //   return <div>Error: Park information is not available.</div>;
//   // }

// }

export { ParkCards };
export type { ParkProps };
