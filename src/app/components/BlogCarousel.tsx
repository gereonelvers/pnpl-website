'use client';

import { useState, useEffect } from 'react';
import { BlogPost } from '@/types/blog';
import Link from 'next/link';

interface BlogCarouselProps {
  posts: BlogPost[];
}

export default function BlogCarousel({ posts }: BlogCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  if (posts.length === 0) {
    return null;
  }

  const postsPerSlide = 1; // Scroll one post at a time
  const totalSlides = posts.length;
  const currentSlideIndex = currentIndex % totalSlides;

  // Auto-advance carousel with progress
  useEffect(() => {
    if (!isAutoPlaying || totalSlides <= 1) return;
    
    const duration = 15000; // 15 seconds
    const updateInterval = 100; // Update progress every 100ms
    let elapsed = 0;
    
    const progressInterval = setInterval(() => {
      elapsed += updateInterval;
      const newProgress = (elapsed / duration) * 100;
      setProgress(newProgress);
      
      if (elapsed >= duration) {
        setCurrentIndex((current) => current + 1); // Endless scrolling
        elapsed = 0;
        setProgress(0);
      }
    }, updateInterval);

    return () => clearInterval(progressInterval);
  }, [isAutoPlaying, totalSlides, currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((current) => current + 1); // Endless scrolling
    setIsAutoPlaying(false);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentIndex((current) => current - 1); // Endless scrolling
    setIsAutoPlaying(false);
    setProgress(0);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setProgress(0);
  };

  // Get posts for current slide
  const getCurrentSlidePosts = () => {
    const startIndex = currentSlideIndex * postsPerSlide;
    return posts.slice(startIndex, startIndex + postsPerSlide);
  };

  const currentSlidePosts = getCurrentSlidePosts();

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Latest Insights
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our latest research and discoveries in neural processing and brain-computer interfaces
          </p>
          <div className="w-24 h-1 bg-black mx-auto mt-8"></div>
        </div>

        <div className="relative">
          {/* Main carousel */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlideIndex * 50}%)` }}
            >
              {/* Create enough slides for endless scrolling */}
              {Array.from({ length: posts.length * 3 }, (_, slideIndex) => {
                const post = posts[slideIndex % posts.length];
                return (
                  <div key={slideIndex} className="w-1/2 flex-shrink-0 px-4">
                    <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:border-black" style={{transformOrigin: 'center'}}>
                      <div className="p-8">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full group-hover:bg-black group-hover:text-white transition-all duration-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Content */}
                        <div className="mb-6">
                          <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-black transition-colors duration-300">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>
                        </div>

                        {/* Meta info */}
                        <div className="text-sm text-gray-500 mb-6 space-y-1">
                          <div>{post.author}</div>
                          <div className="flex items-center gap-4">
                            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            <span>{post.readingTime} min read</span>
                          </div>
                        </div>

                        {/* Read more button */}
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 text-black font-medium group-hover:gap-4 transition-all duration-300"
                        >
                          Read More
                          <svg
                            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-all duration-300 shadow-lg group"
                aria-label="Previous post"
              >
                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-all duration-300 shadow-lg group"
                aria-label="Next post"
              >
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Dots indicator with progress */}
          {posts.length > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {posts.map((_, index) => {
                const isActive = (currentIndex % posts.length) === index;
                return (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`relative w-8 h-2 rounded-full transition-all duration-300 overflow-hidden ${
                      isActive
                        ? 'bg-gray-200'
                        : 'bg-gray-300 hover:bg-gray-400 w-2'
                    }`}
                    aria-label={`Go to post ${index + 1}`}
                  >
                    {isActive && isAutoPlaying && (
                      <div 
                        className="absolute left-0 top-0 h-full bg-black transition-all duration-100 ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    )}
                    {isActive && !isAutoPlaying && (
                      <div className="absolute left-0 top-0 h-full w-full bg-black" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* View all posts link */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            View All Posts
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}