import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { EncryptForm } from "@/components/encrypt-form"

export default function Home() {
  return (
    <main className="container max-w-[960px] py-20">
      <section className="mx-auto mb-20 flex flex-col gap-4 text-center">
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          Encrypt and Decrypt file online
        </h1>
        <span className="text-muted-foreground">
          A free online tool for encryption and decryption of any file instantly
          with the AES 256 GCM algorithm also allows you to download your
          securely encrypted files effortlessly.
        </span>
      </section>
      <div className="space-y-12">
        <Card>
          <CardHeader>
            <CardTitle id="encryption">Encrypt File</CardTitle>
            <CardDescription>
              Securely encrypt your file with AES 256 GCM encryption. Choose a
              file, provide a strong encryption key, and click
              &apos;Encrypt&apos; to safeguard your data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EncryptForm action="encrypt" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle id="decryption">Decrypt File</CardTitle>
            <CardDescription>
              Safely decrypt your file with AES 256 GCM decryption. Choose an
              encrypted file, provide the correct decryption key, and click
              &apos;Decrypt&apos; to retrieve the original data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EncryptForm action="decrypt" />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
