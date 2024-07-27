export type Movie = Record<string, unknown> & {
  id: number;
  title: string;
  poster_path: string;
  genre_ids?: number[];
  genres?: {id: number; name: string}[];
  vote_average: number;
  runtime?: number;
  release_date?: string;
  overview: string;
};
