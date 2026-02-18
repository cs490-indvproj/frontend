function toTitleCase(string) {
  return string.replace(/\w\S*/g, (match) => {
    return match.charAt(0).toUpperCase() + match.substring(1).toLowerCase();
  });
}

export default toTitleCase;
