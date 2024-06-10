'use client'

import React, { useCallback } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import { DotButton, useDotButton } from './CarouselDots'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
  featuredStores: any
}

// const Featured: React.FC<PropType> = (props) => {

// export default function Featured({ featuredStores }: any) {

const Featured: React.FC<PropType> = ({ featuredStores }: PropType, props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    // const resetOrStop =
    //   autoplay.options.stopOnInteraction === false
    //     ? autoplay.reset
    //     : autoplay.stop;

    // resetOrStop();
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  )

  return (
    <section className="embla" aria-label="Featured Stores Carousel">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {featuredStores.map((store: any, index: number) => (
            <div className="embla__slide" key={index}>
              <Link
                href={`/shop/${store.storeSlug}`}
                passHref
                key={store.storeName}
                className="carousel_slide"
                aria-label={`Visit ${store.storeName} store`}
              >
                <div className="img_container">
                  <img
                    src={store.storeImg}
                    alt="Small Business Image"
                    className="slide_img"
                  />
                </div>
                <div className="info_container">
                  <h2>{store.storeName}</h2>
                  <p>{store.storeStory}</p>
                </div>
              </Link>
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
  )
}

export default Featured
