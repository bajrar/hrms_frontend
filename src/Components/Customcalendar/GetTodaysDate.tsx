import NepaliDate from 'nepali-date-converter';

export const today = new Date();

export const todayInBs:any = new NepaliDate(new Date(today));
export const todayInBsFormat = todayInBs.format('YYYY/MM/DD');
