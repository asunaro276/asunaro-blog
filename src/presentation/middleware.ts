import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  
  // /category/[category] パターンをチェック（末尾にページ番号がない場合）
  const categoryMatch = url.pathname.match(/^\/category\/([^\/]+)$/);
  if (categoryMatch) {
    const categoryName = categoryMatch[1];
    return context.redirect(`/category/${categoryName}/1`, 301);
  }
  
  // /tag/[tag] パターンをチェック（末尾にページ番号がない場合）
  const tagMatch = url.pathname.match(/^\/tag\/([^\/]+)$/);
  if (tagMatch) {
    const tagName = tagMatch[1];
    return context.redirect(`/tag/${tagName}/1`, 301);
  }
  
  // /yearmonth/[yearmonth] パターンをチェック（末尾にページ番号がない場合）
  const yearmonthMatch = url.pathname.match(/^\/yearmonth\/([^\/]+)$/);
  if (yearmonthMatch) {
    const yearmonthValue = yearmonthMatch[1];
    return context.redirect(`/yearmonth/${yearmonthValue}/1`, 301);
  }
  
  return next();
}); 
