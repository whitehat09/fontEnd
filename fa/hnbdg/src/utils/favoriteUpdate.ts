const updateObject = (array: Article[], slug: string, action: string) => {
  const article = array.find((item: Article) => item.slug === slug);
  if (article) {
    if (action === "FAVORITE") {
      article.favoritesCount++;
      article.favorited = true;
    }
    if (action === "UNFAVORITE") {
      article.favoritesCount--;
      article.favorited = false;
    }
  }
};

export const updateFavorite = (state: any, slug: string) => {
  updateObject(state.globalArticleList, slug, "FAVORITE");
  updateObject(state.yourFeedList, slug, "FAVORITE");
  state.specificArticle.favorited = true;
  state.specificArticle.favoritesCount++;
  updateObject(state.myArticleList, slug, "FAVORITE");
  updateObject(state.favoritedArticleList, slug, "FAVORITE");
};

export const updateUnfavorite = (state: any, slug: string) => {
  updateObject(state.globalArticleList, slug, "UNFAVORITE");
  updateObject(state.yourFeedList, slug, "UNFAVORITE");
  state.specificArticle.favorited = false;
  state.specificArticle.favoritesCount--;
  updateObject(state.myArticleList, slug, "UNFAVORITE");
  updateObject(state.favoritedArticleList, slug, "UNFAVORITE");
};
