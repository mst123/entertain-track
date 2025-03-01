// 定义枚举类型
type NSFW = "white" | "gray" | "black";

// Unknown = 'unknown', // 未知
// TV = 'tv', // 电视
// OVA = 'ova', // 原创视频动画
// Movie = 'movie', // 电影
// Special = 'special', // 特别版
// ONA = 'ona', // 原创网络动画
// Music = 'music', // 音乐
type MediaType =
  | "unknown"
  | "tv"
  | "ova"
  | "movie"
  | "special"
  | "ona"
  | "music"
  | "tv_special";

// FinishedAiring = 'finished_airing', // 已完结
// CurrentlyAiring = 'currently_airing', // 当前正在播放
// NotYetAired = 'not_yet_aired', // 尚未播出
export type Status = "finished_airing" | "currently_airing" | "not_yet_aired";

// G = 'g', // G - 适合所有年龄
// PG = 'pg', // PG - 儿童
// PG13 = 'pg_13', // PG-13 - 13岁以上观看
// R = 'r', // R - 17+ (暴力和粗话)
// RPlus = 'r+', // R+ - 粗话和轻微裸露
// Rx = 'rx', // Rx - 限制级

type Rating = "g" | "pg" | "pg_13" | "r" | "r+" | "rx";

// 来源
type Source =
  | "other"
  | "original"
  | "manga"
  | "4_koma_manga"
  | "web_manga"
  | "digital_manga"
  | "novel"
  | "light_novel"
  | "visual_novel"
  | "game"
  | "card_game"
  | "book"
  | "picture_book"
  | "radio"
  | "music"
  | "mixed_media"
  | "web_novel";

// 筛选字段
// type Fields =
//   | "id"
//   | "title"
//   | "main_picture"
//   | "alternative_titles"
//   | "synonyms_or_iso639_1"
//   | "start_date"
//   | "end_date"
//   | "synopsis"
//   | "mean"
//   | "rank"
//   | "popularity"
//   | "num_list_users"
//   | "num_scoring_users"
//   | "nsfw"
//   | "genres"
//   | "media_type"
//   | "status"
//   | "my_list_status"
//   | "num_episodes"
//   | "start_season"
//   | "broadcast"
//   | "source"
//   | "average_episode_duration"
//   | "rating"
//   | "studios"
//   | "pictures"
//   | "background"
//   | "related_anime"
//   | "related_manga"
//   | "recommendations"
//   | "statistics";

// 定义子文档 Schema
export interface Picture {
  medium: string; // 缩略图链接
  large: string; // 大图链接
}

interface BaseNode {
  id: number; // 关联动画 ID
  title: string; // 关联动画 /漫画标题
  main_picture: Picture; // 关联动画 /漫画的主图
}
// 定义子文档 Schema
interface AlternativeTitles {
  synonyms: string[]; // 同义词
  en: string; // 英文标题
  ja: string; // 日文标题
}

// 定义子文档 标签
export interface Genre {
  id: number; // 类型 ID
  name: string; // 类型名称
}

// 定义子文档 Schema
interface StartSeason {
  year: number; // 开播年份
  season: string; // 季节
}

// 定义子文档 Schema
interface Studio {
  id: number; // 工作室 ID
  name: string; // 工作室名称
}

// 关联动漫
export interface RelatedAnime {
  node: BaseNode;
  relation_type: string; // 关联类型
  relation_type_formatted: string; // 格式化的关联类型
}

// TODO 暂无关联漫画
export interface RelatedManga {
  AnimeNode: BaseNode;
  relation_type: string; // 关联类型
  relation_type_formatted: string; // 格式化的关联类型
}
// 定义子文档 Schema
interface Recommendation {
  AnimeNode: BaseNode;
  num_recommendations: number; // 推荐数
}

// 定义子文档 Schema
interface StatusStatistics {
  watching: string; // 观看中数量
  completed: string; // 已完结数量
  on_hold: string; // 搁置数量
  dropped: string; // 放弃数量
  plan_to_watch: string; // 计划观看数量
}

// 定义子文档 Schema
interface Statistics {
  status: StatusStatistics; // 观看状态统计
  num_list_users: number; // 列表用户数量
}

// Broadcast 的接口定义
interface Broadcast {
  day_of_the_week: string; // 播出星期
  start_time: string; // 开始时间
}
// 公共请求字段
interface AnimeCommonRequestParams {
  offset: number;
  limit: number;
  // TODO 这个不好用啊
  // fields: `${Fields}`;
  fields: string;
}
// 公共响应参数 下一页
interface CommonPaging {
  paging: {
    next: string;
    previous?: string;
  };
}

// Anime 文档的接口定义
export interface AnimeBase {
  id: number;
  title: string; // 标题
  main_picture: Picture; // 主图片
  alternative_titles: AlternativeTitles; // 别名
  start_date: string; // 开始日期
  end_date: string; // 结束日期
  synopsis: string; // 简介
  mean: number; // 平均评分
  rank: number; // 排名
  popularity: number; // 人气
  num_list_users: number; // 列表用户数量
  num_scoring_users: number; // 打分用户数量
  nsfw: NSFW; // 是否为成人内容
  genres: Genre[]; // 标签类型
  media_type: MediaType; // 媒体类型
  status: Status; // 状态
  num_episodes: number; // 集数
  start_season: StartSeason; // 开播季节
  broadcast: Broadcast; // 播出信息
  source: Source; // 来源
  average_episode_duration: number; // 平均集长
  rating: Rating; // 分级
  studios: Studio[]; // 工作室
  pictures: Picture[]; // 图片
  background: string; // 背景
  related_anime: RelatedAnime[]; // 相关动画
  related_manga: RelatedManga[]; // 相关漫画
  recommendations: Recommendation[]; // 推荐
  statistics: Statistics; // 统计信息
  [key: string]: any;
}

export interface AnimeNode {
  node: AnimeBase;
  ranking: {
    rank: number;
  };
}

// 根据关键字查询动漫列表
export interface GET_ANIME_LIST_SEARCH_QUERY extends AnimeCommonRequestParams {
  q: string;
}
export interface GET_ANIME_LIST_SEARCH_RES extends CommonPaging {
  data: Array<AnimeNode>;
}
// 动漫排名
export type RankingType =
  | "all" // 所有热门动漫系列
  | "airing" // 热门更新中动漫
  | "upcoming" // 热门即将播出动漫
  | "tv" // 热门动画电视系列
  | "ova" // 热门动画OVA系列
  | "movie" // 热门动画电影
  | "special" // 热门动画特别篇
  | "bypopularity" // 按受欢迎程度排名的热门动漫
  | "favorite"; // 受欢迎程度最高的热门动漫

export interface GET_ANIME_LIST_RANKING_QUERY extends AnimeCommonRequestParams {
  ranking_type: RankingType;
}
export interface GET_ANIME_LIST_RANKING_RES extends CommonPaging {
  data: Array<AnimeNode>;
}
// 根据年份和季度查询动漫
export type SeasonType = "winter" | "spring" | "summer" | "fall"; // 季度
export interface GET_ANIME_LIST_SEASON_QUERY extends AnimeCommonRequestParams {
  year: string;
  season: SeasonType;
  sort?: "anime_score" | "anime_num_list_users";
}
export interface GET_ANIME_LIST_SEASON_RES extends CommonPaging {
  data: Array<AnimeNode>;
}
// 查询动漫详情
export interface GET_ANIME_DETAIL_QUERY {
  anime_id: string;
  fields: string;
}
export interface GET_ANIME_DETAIL_RES extends AnimeBase {}
