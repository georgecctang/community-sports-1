import { Carousel } from 'react-bootstrap';
import './CarouselComponent.scss';

export default function CarouselComponent (props) {

return (
  <Carousel  controls={false} pause={false} interval={5000}> 
    <Carousel.Item  >
    <div className="carousel-image1">
      <span className="carousel-content">
        Join the locals for the game<br></br> 
        You've always loved
      </span>
    </div>
    </Carousel.Item>
    <Carousel.Item  >
    <div className="carousel-image2">
    <span className="carousel-content">
      Join the locals for the game<br></br> 
      You've always loved
    </span>
    </div>
    </Carousel.Item>
    <Carousel.Item  >
    <div className="carousel-image3">
    <span className="carousel-content">
      Join the locals for the game<br></br> 
      You've always loved
    </span>
    </div>
    </Carousel.Item>  

  </Carousel>
)
} 
