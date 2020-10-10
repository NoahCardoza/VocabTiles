export default (str: string): string => str.toLowerCase().replace(/\W+/g, '-');
