export interface Apod {
  title: string;
  date: string;
  explanation: string;
  media_type: 'image' | 'video';
  url: string;
  hdurl?: string;
  service_version?: string;
}
