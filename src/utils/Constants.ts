export const yearList = [
  2079, 2080, 2081, 2082, 2083, 2084, 2085, 2086, 2087, 2088, 2089,
];

export const monthNames = [
  'Baishakh',
  'Jestha',
  'Ashadh',
  'Shrawan',
  'Bhadra',
  'Ashwin',
  'Kartik',
  'Mangsir',
  'Poush',
  'Magh',
  'Falgun',
  'Chaitra',
];

export const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export type NepaliMonthDays = {
  2079: number[];
  2080: number[];
  2081: number[];
  2082: number[];
  2083: number[];
  2084: number[];
  2085: number[];
  2086: number[];
  2087: number[];
  2088: number[];
  2089: number[];
};
export const nepaliMonthDays: NepaliMonthDays = {
  2079: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], //2079
  2080: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], //2080
  2081: [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30], //2081
  2082: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30], //2082
  2083: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30], //2083
  2084: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30], //2084
  2085: [31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30], //2085
  2086: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30], //2086
  2087: [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30], //2087
  2088: [30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30], //2088
  2089: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30], //2089
};
export const startDay = {
  2079: '4',

  2080: '5',

  2081: '6',

  2082: '1',

  2083: '2',

  2084: '3',

  2085: '4',

  2086: '6',

  2087: '0',

  2088: '3',

  2089: '4',
};
export const WorkingCondition = [
  {
    label: 'All',
    value: '',
  },
  {
    label: 'Timely In',
    value: 'Timely_In',
  },
  {
    label: 'Timely Out',
    value: 'Timely_Out',
  },

  {
    label: 'Early Out',
    value: 'Early_Out',
  },
  {
    label: 'Late In',
    value: 'Late_In',
  },
  {
    label: 'Late Out',
    value: 'Late_Out',
  },
];
export const workingDay = [
  {
    value: 'Monday - Friday',
    label: 'Mon - Fri',
  },
];

export const applicableTo = [
  {
    value: 'allEmployee',
    label: 'All Employess',
  },
  {
    value: 'allFemaleEmployee',
    label: 'All Female Employess',
  },
];
export const statusArray = [
  {
    value: 'everyYear',
    label: 'Repeat Pattern (Every Year)',
  },
  {
    value: 'weekends',
    label: 'Weekends are observed',
  },
];

export const jobStatus = [
  {
    value: 'allStatus',
    label: 'All Status',
  },
  {
    value: 'closed',
    label: 'Closed',
  },
  {
    value: 'open',
    label: 'Open',
  },
];
export const jobStatusArray = [
  {
    value: 'closed',
    label: 'Closed',
  },
  {
    value: 'open',
    label: 'Open',
  },
];
export const employmentTypeArray = [
  {
    value: 'fullTime',
    label: 'Full - time',
  },
  {
    value: 'partTime',
    label: 'Part - time',
  },
  {
    value: 'contract',
    label: 'Contract',
  },
  {
    value: 'freelance',
    label: 'Freelance',
  },
  {
    value: 'internship',
    label: 'Internship',
  },
  {
    value: 'temporary',
    label: 'Temporary',
  },
];
export const jobsTypeArray = [
  {
    value: 'remote',
    label: 'Remote',
  },
  {
    value: 'onsite',
    label: 'Onsite',
  },
  {
    value: 'hybrid',
    label: 'Hybrid',
  },
];

export const leaveUnit = [
  {
    value: 'days',
    label: 'Days',
  },
  {
    value: 'hours',
    label: 'Hours',
  },
];
