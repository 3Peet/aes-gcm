"use client"

import { encryptFile } from "@/utils/aes-gcm"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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

const formSchema = z.object({
  file: z.instanceof(File),
  key: z.string({}),
})

const downloadFile = (filePath: string, name: string) => {
  const link = document.createElement("a")
  link.href = filePath
  link.download = name
  link.click()
}

type AesType = "encrypt" | "decrypt"

export function EncryptForm({ type }: { type: AesType }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (type === "encrypt") {
      const encryptedMessage = await encryptFile(values.file, values.key)
      const blob = new Blob([encryptedMessage], {
        type: "application/octet-stream",
      })
      const file = new File([blob], values.file.name)
      downloadFile(URL.createObjectURL(file), values.file.name)
    }
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
                  id="file"
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
              <FormLabel>Key</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{`${type} & download`}</Button>
      </form>
    </Form>
  )
}
