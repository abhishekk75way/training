export const setTheme = (theme: "light" | "dark") => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
};

export const loadTheme = () => {
  const saved = localStorage.getItem("theme") as "light" | "dark" | null;
  setTheme(saved ?? "light");
};
