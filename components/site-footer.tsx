export default function SiteFooter() {
  return (
    <footer className="container py-6">
      <p className="text-muted-foreground text-balance text-center text-sm leading-loose">
        Built by 3Peet. The source code is available on{" "}
        <a
          href="https://github.com/3Peet/aes-gcm"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          GitHub
        </a>
        .
      </p>
    </footer>
  )
}
