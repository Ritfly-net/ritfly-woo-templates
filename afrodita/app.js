document.addEventListener("DOMContentLoaded",()=>{

  /* PREHEADER */
  const topMessages=[...document.querySelectorAll(".top-message")];
  const prevButton=document.querySelector(".top-slider-arrow.prev");
  const nextButton=document.querySelector(".top-slider-arrow.next");

  let topIndex=0;
  let topTimer;

  function showTopMessage(index){
    topMessages.forEach((item,i)=>{
      item.classList.toggle("is-active",i===index);
    });
    topIndex=index;
  }

  function nextTopMessage(){
    showTopMessage((topIndex+1)%topMessages.length);
  }

  function prevTopMessage(){
    showTopMessage((topIndex-1+topMessages.length)%topMessages.length);
  }

  function startTopSlider(){
    clearInterval(topTimer);
    topTimer=setInterval(nextTopMessage,3600);
  }

  nextButton.addEventListener("click",()=>{
    nextTopMessage();
    startTopSlider();
  });

  prevButton.addEventListener("click",()=>{
    prevTopMessage();
    startTopSlider();
  });

  startTopSlider();


  /* HERO */
  const slides=[...document.querySelectorAll(".hero-slide")];
  const dots=[...document.querySelectorAll(".hero-dot")];

  let currentSlide=0;
  let heroTimer;
  const HERO_TIME=6200;

  function showHeroSlide(index){
    slides.forEach((slide,i)=>{
      slide.classList.toggle("is-active",i===index);
    });

    dots.forEach((dot,i)=>{
      dot.classList.toggle("is-active",i===index);
    });

    currentSlide=index;
  }

  function nextHeroSlide(){
    showHeroSlide((currentSlide+1)%slides.length);
  }

  function startHeroSlider(){
    clearInterval(heroTimer);
    heroTimer=setInterval(nextHeroSlide,HERO_TIME);
  }

  dots.forEach((dot,index)=>{
    dot.addEventListener("click",()=>{
      showHeroSlide(index);
      startHeroSlider();
    });
  });

  startHeroSlider();


  /* HEADER MICRO ANIMATION */
  const header=document.querySelector("[data-header]");
  let scrollTimer;

  window.addEventListener("scroll",()=>{
    if(!header) return;

    if(window.scrollY>10 && window.scrollY<170){
      header.classList.add("is-scrolling");
    }else{
      header.classList.remove("is-scrolling");
    }

    clearTimeout(scrollTimer);

    scrollTimer=setTimeout(()=>{
      header.classList.remove("is-scrolling");
    },150);

  },{passive:true});



  /* CATEGORY CAROUSELS */
  document.querySelectorAll("[data-carousel-next]").forEach(button=>{
    button.addEventListener("click",()=>{
      const track=document.getElementById(button.dataset.carouselNext);
      if(!track) return;
      track.scrollBy({left:track.clientWidth*.78,behavior:"smooth"});
    });
  });

  document.querySelectorAll("[data-carousel-prev]").forEach(button=>{
    button.addEventListener("click",()=>{
      const track=document.getElementById(button.dataset.carouselPrev);
      if(!track) return;
      track.scrollBy({left:-track.clientWidth*.78,behavior:"smooth"});
    });
  });


  /* PAUSE WHEN TAB HIDDEN */
  document.addEventListener("visibilitychange",()=>{
    if(document.hidden){
      clearInterval(heroTimer);
      clearInterval(topTimer);
    }else{
      startHeroSlider();
      startTopSlider();
    }
  });

});
