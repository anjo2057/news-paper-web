export interface Article {
  id: number;
  id_user: number;
  abstract: string;
  subtitle: string;
  update_date: string;
  category: string;
  title: string;
  body: string;
  timestamp: string;
  img_data: string | null;
  img_media_type: string | null;
  thumbnail_image: string | null;
  thumbnail_media_type: string | null;
}
