export const getNumberOrNull = (value: FormDataEntryValue | null) => {
  if (value === null || value === "") {
    return null;
  }

  return Number(value);
};
