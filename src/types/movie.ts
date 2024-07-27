export type Movie = Record<string, unknown> & {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
  popularity: number;
};
