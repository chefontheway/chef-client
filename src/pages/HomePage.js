import { Link } from 'react-router-dom';
import descriptionImg from '../images/Homepage.png'
import pasta from '../images/Pasta-copy.jpg'
import logo from '../images/logo.svg'
import { useEffect } from 'react';

function HomePage() {

  // Function to check if an element is in the viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to add animations when elements are in the viewport
function handleScrollAnimations() {
  const elementsToAnimate = document.querySelectorAll('.logo-home');
  const imgDescriptionElement = document.querySelectorAll('.img-description');
  const whoAreWeElement = document.querySelectorAll('.who-are-we-text');
  const descriptionWhoAreWeElement = document.querySelectorAll('.description-who-are-we');
  const lookAllChefElement = document.querySelectorAll('.look-all-chef-text');

  elementsToAnimate.forEach((element) => {
    const isInViewport = isElementInViewport(element);
    if (isInViewport) {
      element.classList.add('animate');
    } else {
      element.classList.remove('animate');
    }
  });

  imgDescriptionElement.forEach(element => {
    const isInViewport = isElementInViewport(element);
    if(isInViewport) {
      element.classList.add("animate")
    } else {
      element.classList.remove("animate")
    }
  });

  whoAreWeElement.forEach(element => {
    const isInViewport = isElementInViewport(element);
    if(isInViewport) {
      element.classList.add("animate")
    } else {
      element.classList.remove("animate")
    }
  });

  descriptionWhoAreWeElement.forEach(element => {
    const isInViewport = isElementInViewport(element);
    if(isInViewport) {
      element.classList.add("animate")
    } else {
      element.classList.remove("animate")
    }
  });

  lookAllChefElement.forEach(element => {
    const isInViewport = isElementInViewport(element);
    if(isInViewport) {
      element.classList.add("animate")
    } else {
      element.classList.remove("animate")
    }
  });

};

useEffect(() => {
  document.addEventListener('scroll', handleScrollAnimations);
  
  handleScrollAnimations();
}, [])


    return (
      <div className="home-page">
        <div className='coverHomepage'>
          <img src={pasta} alt="HomePage"/>
        <div>
            <img className='logo-home' src={logo} alt='logo-homepage'/>
        </div>
        </div>

        <div className='article-home'>
        <div className='carousselHome'>
          <img src={descriptionImg} alt='descriptionImg' className='img-description'/>
          <div>
            <h1 className='who-are-we-text'>Who are we ? </h1>
            <p className='description-who-are-we'>We make our application available for any individual looking for a home chef and for home chefs looking for customers in their area.</p>
            <Link to="/services"><h3 className='look-all-chef-text'>Look all chef →</h3></Link>
          </div>
        </div>
      </div>
    </div>
    );
  }
  
  export default HomePage;
  