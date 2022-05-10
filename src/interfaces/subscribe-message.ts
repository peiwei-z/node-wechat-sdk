export interface TemplateData {
  [key: string]: { value: string; color?: string };
}

export interface SubscribeMessage {
  touser: string;

  template_id: string;

  data: TemplateData;

  page?: string;

  url?: string;

  miniprogram?: { appid: string; pagepath?: string };

  color?: string;

  lang?: string;
}
