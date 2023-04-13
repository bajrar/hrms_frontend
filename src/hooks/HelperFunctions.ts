export function reduceByKey(arr: any, key: any) {
  return arr?.reduce((accumulator: any, currentValue: any) => {
    return [...accumulator, currentValue[key]];
  }, []);
}
export function reduceByKeys(arr: any, id: any, name: any) {
  return arr?.reduce((accumulator: any, currentValue: any) => {
    return [
      ...accumulator,
      { value: currentValue?.[id], label: currentValue?.[name] },
    ];
  }, []);
}
