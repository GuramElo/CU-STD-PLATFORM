export const TRANSPORTER_CONFIG = {
  service: 'yahoo',
  auth: {
    user: 'guramieliza@yahoo.com',
    pass: 'yzwaglqfomgryexp',
  }
};

export const MAIL_OPTIONS_BASE: Partial<IMailOptions> = {
  from: 'guramieliza@yahoo.com'
};
export interface IMailOptions {
  from: string,
  to: string | string[],
  subject: string,
  text: string,
  html: string
}


