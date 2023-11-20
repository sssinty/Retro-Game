const themes = {
  prairie: 'prairie',
  desert: 'desert',
  arctic: 'arctic',
  mountain: 'mountain',
};

export function getThemes(index) {
  return Object.keys(themes)[index];
}
export default themes;
