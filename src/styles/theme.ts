export const theme = {
  colors: {
    bgPrimary: "#FFFFFF",
    bgSecondary: "#F5F5F5",
    bgInverted: "#0F1115",
    textPrimary: "#111111",
    textMuted: "#828282",
    accent: "#FF5A1F",
    borderPrimary: "#E5E5E5",
  },
  padding: {
    bento: "32px",
    bentoLg: "48px",
    bentoXl: "64px",
  },
  border: {
    primary: "1px solid #E5E5E5",
  },
  typography: {
    fontFamilySans: "var(--font-inter)",
    fontFamilyMono: "var(--font-roboto-mono)",
    metaSize: "10px",
    metaSpacing: "0.05em",
    metaTransform: "uppercase" as const,
  },
};

export const cn = (...classes: (string | false | undefined | null)[]): string =>
  classes.filter(Boolean).join(" ");