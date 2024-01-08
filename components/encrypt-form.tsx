"use client"

import { decryptFile, encryptFile } from "@/utils/aes-gcm"
import { zodResolver } from "@hookform/resolvers/zod"
import { DicesIcon, Download } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type AesActionType = "encrypt" | "decrypt"

const formSchema = z.object({
  file: z.instanceof(File),
  key: z.string({
    required_error:
      "Please enter a strong key. This field cannot be left empty.",
  }),
})

const downloadFile = (filePath: string, name: string) => {
  const link = document.createElement("a")
  link.href = filePath
  link.download = name
  link.click()
}

const buttonMessage = {
  encrypt: "Encrypt",
  decrypt: "Decrypt",
}

export function EncryptForm({ action }: { action: AesActionType }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { file, key } = values
      const encryptedMessage =
        action === "encrypt"
          ? await encryptFile(file, key)
          : await decryptFile(file, key)
      const blob = new Blob([new Uint8Array(encryptedMessage)], {
        type: file.type,
      })
      downloadFile(URL.createObjectURL(blob), file.name)
    } catch (error) {
      toast.error(`Can not ${action} file`, {
        description:
          typeof error === "object"
            ? error?.toString()
            : "Something went wrong",
      })
    }
  }

  const onRandomKey = () => {
    // Generate an array of 32 random bytes (256 bits)
    const randomBytes = new Uint8Array(32)
    window.crypto.getRandomValues(randomBytes)

    // Convert the array to a base64-encoded string
    const base64Key = window.btoa(
      String.fromCharCode.apply(null, Array.from(randomBytes)),
    )

    form.setValue("key", base64Key)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="file"
          render={({ field: { onChange }, ...field }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) =>
                    onChange(e.target.files ? e.target.files[0] : null)
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <div className="flex justify-between">
                  <span>Key</span>
                  {action === "encrypt" && (
                    <Button
                      className="flex h-fit gap-1 p-0"
                      variant="link"
                      type="button"
                      onClick={onRandomKey}
                      aria-label="random key icon"
                    >
                      <DicesIcon size={20} />
                    </Button>
                  )}
                </div>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="flex w-full items-center gap-2 sm:w-fit"
        >
          {buttonMessage[action]}
          <Download size={16} strokeWidth={3} />
        </Button>
      </form>
    </Form>
  )
}
