export interface Article {
  id: number;
  id_user: number;
  title: string;
  abstract: string;
  subtitle: string;
  update_date: string;
  category: string;
  body: string | null;
  timestamp: string;
  image_data: string | null;
  image_media_type: string | null;
  thumbnail_image: string | null;
  thumbnail_media_type: string | null;
}
