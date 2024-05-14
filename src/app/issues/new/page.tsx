import { Button, TextArea, TextField } from "@radix-ui/themes"
import MarkdownEditor from "@/app/components/MarkdownEditor"

const NewIssuePage = () => {
  return (
    <div className="max-w-2xl space-y-3">
      <TextField.Root placeholder="Title" />
      <TextArea placeholder="Description" />
      <MarkdownEditor />
      <Button>Submit New Issue</Button>
    </div>
  )
}

export default NewIssuePage
