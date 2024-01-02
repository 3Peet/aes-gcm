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
          AES.GCM Encrypt & Decrypt
        </h1>
        <span className="text-muted-foreground">
          The online AES encryption and decryption tool provides online AES
          encryption and decryption test. And the input and output supports
          three formats: hex, string and Base64.
        </span>
      </section>
      <div className="space-y-12">
        <Card>
          <CardHeader>
            <CardTitle id="encryption">Encryption</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
              assumenda, voluptatem, natus aperiam possimus accusantium cum
              veniam ducimus quisquam provident perspiciatis ea! Doloribus
              accusantium ullam eveniet reiciendis quos id hic!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EncryptForm action="encrypt" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle id="decryption">Decryption</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
              assumenda, voluptatem, natus aperiam possimus accusantium cum
              veniam ducimus quisquam provident perspiciatis ea! Doloribus
              accusantium ullam eveniet reiciendis quos id hic!
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
