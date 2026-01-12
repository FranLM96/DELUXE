
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'event';
  canonical?: string;
  jsonLd?: object;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  ogImage = 'https://deluxe-experience.com/og-default.jpg', 
  ogType = 'website',
  canonical,
  jsonLd 
}) => {
  const location = useLocation();
  const siteTitle = 'Deluxe | Experiencia Musical Elite';
  const fullTitle = `${title} | ${siteTitle}`;
  const currentUrl = `https://deluxe-experience.com${location.pathname}${location.search}`;
  const finalCanonical = canonical || currentUrl;

  useEffect(() => {
    // Actualizar Título
    document.title = fullTitle;

    // Actualizar Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Actualizar Open Graph Tags
    const ogTags = {
      'og:title': fullTitle,
      'og:description': description,
      'og:url': finalCanonical,
      'og:type': ogType,
      'og:image': ogImage,
      'og:site_name': 'Deluxe Entertainment'
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // Actualizar Twitter Card Tags
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': fullTitle,
      'twitter:description': description,
      'twitter:image': ogImage
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // Manejar Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', finalCanonical);

    // Manejar JSON-LD (Datos Estructurados)
    let scriptJsonLd = document.getElementById('json-ld-data');
    if (jsonLd) {
      if (!scriptJsonLd) {
        scriptJsonLd = document.createElement('script');
        scriptJsonLd.setAttribute('type', 'application/ld+json');
        scriptJsonLd.id = 'json-ld-data';
        document.head.appendChild(scriptJsonLd);
      }
      scriptJsonLd.textContent = JSON.stringify(jsonLd);
    } else if (scriptJsonLd) {
      scriptJsonLd.remove();
    }

  }, [fullTitle, description, ogImage, ogType, finalCanonical, jsonLd]);

  return null;
};
