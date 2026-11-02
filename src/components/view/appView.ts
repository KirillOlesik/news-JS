import News from './news/news';
import Sources from './sources/sources';
import { Article, Source } from '../../types';

export class AppView {
  private news: News;
  private sources: Sources;
  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews(data: Article[]): void {
    const values = data ? data : [];
    this.news.draw(values);
  }

  public drawSources(data: Source[]): void {
    const values = data ? data : [];
    this.sources.draw(values);
  }
}

export default AppView;
