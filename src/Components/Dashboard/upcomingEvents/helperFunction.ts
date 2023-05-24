import NepaliDate from "nepali-date-converter";

export const formatDate = (dateString: any) => {
    const date = new NepaliDate(dateString);
    const dayIndex = date.getDay(); // Day index starts from 0
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayName = dayNames[dayIndex];
    const monthIndex = date.getMonth(); // Month index starts from 0
    const day = date.getDate();
    const nepaliMonths = [
      "Baisakh",
      "Jestha",
      "Ashad",
      "Shrawan",
      "Bhadra",
      "Ashwin",
      "Kartik",
      "Mangsir",
      "Poush",
      "Magh",
      "Falgun",
      "Chaitra",
    ];
    const monthName = nepaliMonths[monthIndex];

    return `${dayName}, ${monthName} ${day}`;
  };