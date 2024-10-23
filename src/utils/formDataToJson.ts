export async function formDataToJson(
  formData: FormData
): Promise<Record<string, any>> {
  const jsonObject: Record<string, any> = {};
  // Iterate through each form field and add it to the JSON object
  formData.forEach((value, key) => {
    // Handle the case where multiple entries have the same key (arrays)
    if (jsonObject[key]) {
      // If the key already exists, convert the value into an array
      if (Array.isArray(jsonObject[key])) {
        jsonObject[key].push(value);
      } else {
        jsonObject[key] = [jsonObject[key], value];
      }
    } else {
      jsonObject[key] = value;
    }
  });

  return jsonObject;
}
