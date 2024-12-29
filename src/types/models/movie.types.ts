type IMovie = {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  year: number;
  is_for_children: boolean | null;
  summary: string | null;
  genres: string[] | null;
  thumbnail: string | null;
  rating: number | null;
};
