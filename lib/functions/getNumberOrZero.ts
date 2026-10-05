export const getNumberOrZero = (value: FormDataEntryValue | null) => {
  if (value === null || value === "") {
    return 0;
  }

  return Number(value);
};
