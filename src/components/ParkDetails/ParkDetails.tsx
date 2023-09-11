import React from 'react';
import './ParkDetails.css';

interface ParkDetailsProps {
  id: string;
  fullName: string;
  description: string;
  url: string;
  activities: Array<{ id: string; name: string }>;
  images: Array<{ url: string; altText: string }>;
}

function ParkDetails(props: ParkDetailsProps) {
  const { park } = props;

  if (!park) {
    return <div className="error">Park information is not available.</div>;
  }
  return (
    <div className='park-details'>
      <h3>{park.fullName}</h3>
      <p>{park.description}</p>
      <a href={park.url} target="_blank" rel="noopener noreferrer">Learn More</a>
      <h4>Activities</h4>
      <ul>
        {park.activities.map(activity => (
          <li key={activity.id}>{activity.name}</li>
        ))}
      </ul>
      <div className="image-gallery">
        {park.images.map((image, index) => (
          <div key={index}>
            <img
              src={image.url}
              alt={image.altText}
              onError={(e) => {
                e.currentTarget.onerror = null;
                // e.currentTarget.src = errorImage;
                e.currentTarget.src = "/logo.svg"; 
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParkDetails;
