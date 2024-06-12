'use client';

import React, { useCallback } from 'react';
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import { DotButton, useDotButton } from './CarouselDots';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
  featuredStores: any;
};

// const Featured: React.FC<PropType> = (props) => {

// export default function Featured({ featuredStores }: any) {

const Featured: React.FC<PropType> = ({ featuredStores }: PropType, props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    // const resetOrStop =
    //   autoplay.options.stopOnInteraction === false
    //     ? autoplay.reset
    //     : autoplay.stop;

    // resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  );

  return (
    <section className="embla" aria-label="Featured Stores Carousel">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {featuredStores.map((store: any, index: number) => (
            <div className="embla__slide" key={index}>
              <div className="carousel_slide">
                <div className="img_container">
                  <img
                    src={store.storeImg}
                    alt="Small Business Image"
                    className="slide_img"
                  />
                </div>
                <div className="info_container">
                  <h2>{store.storeName}</h2>
                  <p className="truncated_text">{store.storeStory}</p>
                  <Link href={`/shop/${store.storeSlug}`} key={store.storeName}>
                    <button className="unfilled_button">Visit Store</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div
          className="embla__dots"
          role="tablist"
          aria-label="Carousel navigation"
        >
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
              role="tab"
              aria-selected={index === selectedIndex}
              aria-controls={`embla__slide--${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
