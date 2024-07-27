export type Cast = Record<string, unknown> & {
  id: number;
  original_name?: string;
  name?: string;
  character: string;
  profile_path: string;
  biography?: string;
  birthday?: string;
  popularity?: number;
  place_of_birth?: string;
};
