import type { Page } from "/domain/models/page/Page";

export type PathInfo = {
  directory: string;
  id: string;
  page: Page;
};

export interface PathGenerator {
  /**
   * パス文字列を生成する
   */
  generatePath(pathInfo: PathInfo): string;
  
  /**
   * 次のページのパス文字列を生成する
   */
  generateNextPagePath(pathInfo: PathInfo): string;
  
  /**
   * 前のページのパス文字列を生成する
   */
  generatePrevPagePath(pathInfo: PathInfo): string;
} 
