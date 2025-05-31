
document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelectorAll('pre code');
  root.forEach((code) => {
    console.log(code);
    // Prism.highlightElement(code);
  });
});
