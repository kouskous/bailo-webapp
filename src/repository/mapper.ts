function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function convertKeysToCamelCase<T>(obj: any): T {
  if (Array.isArray(obj)) {
    return obj.map(convertKeysToCamelCase) as unknown as T;
  } else if (obj !== null && typeof obj === 'object') {
    const newObj: any = {};
    for (const key of Object.keys(obj)) {
      const camelKey = snakeToCamel(key);
      newObj[camelKey] = convertKeysToCamelCase(obj[key]);
    }
    return newObj as T;
  }
  return obj as T;
}
