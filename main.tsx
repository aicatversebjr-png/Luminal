@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --color-zinc-950: #09090b;
  --color-zinc-900: #18181b;
  --color-zinc-800: #27272a;
}

@layer base {
  body {
    @apply bg-zinc-950 text-zinc-100 antialiased;
  }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-zinc-800 rounded-full;
}
